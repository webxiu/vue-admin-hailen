const express = require('express');
const router = express.Router();


//连接数据库配置
const connection = require('../dbconfig/index');

/* GET home page. */
router.post('/api', function (req, res) {
    // res.render('index', { title: 'Express' });
    let { username, password } = req.body;
    const sql = `select * from username where username='${username}' and password='${password}'`;
    connection.connect();
    connection.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data);
        console.log('数据库' + JSON.stringify(data));
    });
    connection.end();
});

router.get('/order', function (req, res) {
    let { page, size, search } = req.query;
    let pageNum = (page - 1) * size;

    // 搜索+分页数据
    const sql = `select * from wk_order WHERE c_user Like'%${search}%' or c_phone Like'%${search}%' or c_order Like'%${search}%' or c_color Like'%${search}%' or c_address Like'%${search}%' or c_date Like'%${search}%' LIMIT ${pageNum},${size}`;
    // console.log(sql)

    connection.query(sql, (err, data) => {
        if (err) throw err;
        // console.log('数据' + JSON.stringify(data));
        res.json(data);
    });
});

module.exports = router;
