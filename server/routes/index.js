const express = require('express');
const router = express.Router();
const connection = require('../dbconfig'); //引入数据库
const sd = require('silly-datetime'); //时间处理


//当前时期
let currentTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

//登录(单个查询)
router.get('/', (req, res, next) => {
    res.json({
        a: 99999
    })
    next()
})
//登录(单个查询)
router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body
    const sql = `select * from username where username='${username}' and password='${password}'`
    console.log('result:' + sql)
    connection.query(sql, (err, data) => {
        if (err) throw err;
        console.log('data:' + data)
        res.json(data)
    })
})


//添加登录日志
router.post('/log', (req, res) => {
    const {
        username,
        type,
        handleType,
        ip,
        typeID
    } = req.body;
    let currentTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')

    const sql = `insert into k_log (k_user,k_type,k_handleType,k_ip,k_date,k_typeId) values('${username}','${type}','${handleType}','${ip}','${currentTime}','${typeID ? typeID : '-'}')`
    // console.log('result:' + sql)
    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })
})

//获取日志数据
router.get('/logs', function (req, res) {
    let {
        page,
        size
    } = req.query;
    let pageNum = (page - 1) * size;
    let resultData = {}

    // 搜索+分页数据
    const countSQL = `SELECT COUNT(*) as sum FROM k_log`;

    const querySQL = `SELECT * FROM k_log WHERE 1=1 order by k_id desc LIMIT ${pageNum},${size}`;
    connection.query(countSQL, function (err, data) {
        if (err) throw err;
        // console.log('数据' + JSON.stringify(result));
        connection.query(querySQL, function (err, result) {
            if (err) throw err;
            console.log('num:' + data[0].sum);
            resultData.count = data[0].sum
            resultData.logInfo = result
            res.json(resultData)
        });
    });

});



//首页订单
router.get('/order', function (req, res) {
    let {
        page,
        size,
        search
    } = req.query;
    let pageNum = (page - 1) * size;
    let resultData = {}
    // 搜索+分页数据
    const countSQL = `SELECT COUNT(*) as sum FROM wn_order WHERE w_username Like'%${search}%' or w_phone Like'%${search}%' or w_order_num Like'%${search}%' or w_wl_status Like'%${search}%' or w_address Like'%${search}%' or w_import_date Like'%${search}%'`;

    const querySQL = `SELECT * FROM wn_order WHERE w_username Like'%${search}%' or w_phone Like'%${search}%' or w_order_num Like'%${search}%' or w_wl_status Like'%${search}%' or w_address Like'%${search}%' or w_import_date Like'%${search}%' order by w_id desc LIMIT ${pageNum},${size}`;
    // const sql = `select SQL_CALC_FOUND_ROWS * from wk_order limit 10 OFFSET 1 ;SELECT FOUND_ROWS() as count`;
    connection.query(countSQL, function (err, data) {
        if (err) throw err;
        // console.log('数据' + JSON.stringify(result));
        connection.query(querySQL, function (err, result) {
            if (err) throw err;
            console.log('num:' + data[0].sum);
            resultData.count = data[0].sum
            resultData.userInfo = result
            res.json(resultData)
        });
    });

});

//编辑订单
router.post('/edit', (req, res) => {
    let {
        w_id,
        w_username,
        w_phone,
        w_order_num,
        w_wl_status,
        w_address
    } = req.body;
    //获取时间格式
    let modifyTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    let editSql = `update wn_order set w_username='${w_username}',w_phone='${w_phone}',w_order_num='${w_order_num}',w_wl_status='${w_wl_status}',w_address='${w_address}',w_import_date='${modifyTime}' where w_id=${w_id}`;
    connection.query(editSql, (err, data) => {
        if (err) throw err;
        res.json(data);
        console.log(data);
    })
})

//添加订单
router.post('/add', (req, res) => {
    let {
        w_username,
        w_phone,
        w_order_num,
        w_wl_status,
        w_address
    } = req.body;
    let addTime = sd.format(new Date(), "YYYY-MM-DD HH:mm:ss")
    let addSql = `insert into wn_order (w_username,w_phone,w_order_num,w_wl_status,w_address,w_import_date) values('${w_username}','${w_phone}','${w_order_num}','${w_wl_status}','${w_address}','${addTime}')`;
    connection.query(addSql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })

})
//删除订单
router.post('/delete', (req, res) => {
    let {
        deleteId
    } = req.body;
    let delSql = `delete FROM wn_order where w_id=${deleteId}`;
    connection.query(delSql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })

})

//点赞
router.get('/praise', (req, res) => {
    let {
        theme,
        zan_num,
        theme_id,
        user_id
    } = req.query;
    let newTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    // console.log(66,theme,zan_num,theme_id,user_id)
    //根据文章id和用户id查询是否有点赞记录
    let zanQuery = `select * from k_praise where user_id='${user_id}' and theme_id='${theme_id}'`;
    let zanInsert = `update wn_order set w_praise='${++zan_num}',w_praise_date='${newTime}' where w_id='${theme_id}'`
    let zanUpdate = `insert into k_praise(theme_id, theme, user_id, status, date) values('${theme_id}','${theme}','${user_id}',1,'${newTime}')`
    connection.query(zanQuery, (err, data) => {
        if (err) throw err;
        // 判断用户是否点过赞
        if (data[0] && data[0].status == 1 && data[0].user_id == user_id) {
            res.json({
                serverStatus: 0,
                msg: '您已经点过赞了'
            })
        } else {
            // 更新点赞数量
            connection.query(zanInsert, (err, add) => {
                if (err) throw err;
            })
            // 储存点用户点赞记录(文章id和用户id...)
            connection.query(zanUpdate, (err, zan) => {
                if (err) throw err;
                // console.log('赞成功2',JSON.stringify(zan))
                res.json(zan);
            })

        }
    })

})
//我的点赞
router.get('/zan', (req, res) => {
    let {
        user_id
    } = req.query;
    let zanQuery = `select * from k_praise where user_id='${user_id}' order by id desc`;
    connection.query(zanQuery, (err, zan) => {
        if (err) throw err;
        res.json(zan);
    })
})
//签到
router.get('/signin', (req, res) => {
    let {
        user_id
    } = req.query;
    console.log(currentTime, user_id);


    let signinQuery = `select * from k_signin where user_id='${user_id}' order by id desc`;
    connection.query(signinQuery, (err, signin) => {
        if (err) throw err;
        res.json(signin);
    })
})

// 创建连接池
// let pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'user_data',
//     port: 3306,
// })

//开启多个查询


// router.get('/order', (req, res) => {
//     let { page, size, search } = req.query;
//     let pageNum = (page - 1) * size;
//     // page = connection.escape(page);

//     const sql = `select count(*) wk_order; SELECT * FROM wk_order WHERE c_user Like'%${search}%' or c_phone Like'%${search}%' or c_order Like'%${search}%' or c_color Like'%${search}%' or c_address Like'%${search}%' or c_date Like'%${search}%' LIMIT ${pageNum},${size}`;
//     console.log(sql)
//     // 获取连接
//     pool.getConnection((err, connection) => {
//         if (err) throw err;

//         connection.query(sql, (err, data) => {
//             if (err) throw err;
//             console.log('data:'+JSON.stringify(data))

//             res.json(data)
//         })
//         // 释放数据库连接
//         connection.release();
//     })

// })

// let connection = mysql.createConnection({ multipleStatements: true })
// router.all('/order', function(req, res, next){
//     var param = '';
//     if (req.method == "POST") {
//         param = req.body;
//     } else{
//         param = req.query || req.params;
//     }
//     if (param.page == '' || param.page == null || param.page == undefined) {
//         res.end(JSON.stringify({msg:'请传入参数page',status:'102'}));
//         return;
//     }
//     var start = (param.page - 1) * 10;
//     var sql = 'SELECT COUNT(*) FROM wk_order; SELECT * FROM wk_order limit ' + start + ',20';
//     pool.getConnection(function(err, connection) {
//         if(err) throw err;
//         connection.query(sql,function (err, results) {
//             pool.releaseConnection(connection);
//             console.log(JSON.stringify(results));
//             if (err){
//                 throw err
//             }else{
//                 // 计算总页数
//                 var allCount = results[0][0]['COUNT(*)'];
//                 var allPage = parseInt(allCount)/20;
//                 var pageStr = allPage.toString();
//                 // 不能被整除
//                 if (pageStr.indexOf('.')>0) {
//                     allPage = parseInt(pageStr.split('.')[0]) + 1;
//                 }
//                 var userList = results[1];
//                 res.end(JSON.stringify({msg:'操作成功',status:'100',totalPages:allPage,currentPage:param.page,data:userList}));
//            }
//         })
//     })
// })

module.exports = router;