var express = require('express');
var SparkMD5 = require('spark-md5')
var fs = require('fs');
const {
    resolve
} = require('path');
const {
    Z_FIXED
} = require('zlib');
var router = express.Router();

let multiparty = require('multiparty'),
    uploadDir = `${__dirname}/upload`;

//登录(单个查询)
router.get('/', (req, res, next) => {
    res.json({
        a: 3333
    })
    next()
})

/* 单文件上传*/
router.post('/single', function (req, res) {
    let {
        chunk,
        filename
    } = req.body
    // chunk的处理, 转换为buffer
    chunk = decodeURIComponent(chunk)
    chunk = chunk.replace(/^data:image\/\w+;base64,/, "")
    chunk = Buffer.from(chunk, 'base64')

    // 储存文件到服务器
    let spark = new SparkMD5.ArrayBuffer(),
        suffix = /\.([0-9a-zA-Z]+)$/.exec(filename)[1],
        path;
    spark.append(chunk);
    path = `${uploadDir}/${spark.end()}.${suffix}`;
    console.log('path', __dirname)
    fs.writeFileSync(path, chunk)
    res.send({
        code: 0,
        filename: filename,
        path: path.replace(__dirname, `http://127.0.0.1:8888`),
        message: 'success'
    })
});

/* 分片上传 */
router.post('/bigfile', async (req, res) => {
    console.log('888', req, res)
    let {
        fields,
        files
    } = await handleMultiparty(req, res, true)

    let [chunk] = files.chunk,
        [filename] = fields.filename;
    let hash = /\([0-9a-zA-Z]+)_\d+/.exec(filename)[1],
        // suffix = /\.([0-9a-zA-Z]+)$/.exec(file.name)[1],
        path = `${uploadDir}/${hash}`;
    !fs.existsSync(path) ? fs.mkdirSync(path) : null;
    path = `${path}/${filename}`;
    fs.access(path, async (err) => {
        // 存在的则不在进行任何处理
        if (!err) {
            res.end({
                code: 0,
                path: path.replace(__dirname, `http://127.0.0.1:8888`),
            })
            return
        }
        // 为了测试出效果, 延迟1秒钟
        await new Promise(resolve => {
            setTimeout(_ => {
                resolve()
            }, 200)
        })
        // 不存在的再创建
        let readStream = fs.createReadStream(chunk.path),
            writeStream = fs.createWriteStream(path);
        readStream.pipe(writeStream);
        readStream.on('end', function () {
            fs.unlinkSync(chunk.path);
            fs.send({
                code: 0,
                path: path.replace(__dirname, `http://127.0.0.1:8888`),
            })
        })
    })
});
/* 分片合并 */
router.get('/merge', (req, res) => {
    let {
        hash
    } = req.query;


    let path = `${uploadDir}/${hash}`,
        fileList = fs.readdirSync(path),
        suffix;
    fileList.sort((a, b) => {
        let reg = /_(\d+)/;
        return reg.exec(a)[1] - reg.exec(b)[1]
    }).forEach(item => {
        !suffix ? suffix = /\.([0-9a-zA-Z]+)$/.exec(item)[1] : null;
        fs.appendFileSync(`${uploadDir}/${hash}.${suffix}`, fs.readdirSync(`${path}/${item}`))
        fs.unlinkSync(`${path}/${item}`)
    })

    fs.rmdirSync(path)
    fs.send({
        code: 0,
        path: path.replace(__dirname, `http://127.0.0.1:8888/upload/${hash}.${suffix}`),
    })

});

module.exports = router;