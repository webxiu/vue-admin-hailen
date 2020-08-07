const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//时间处理
const sd = require('silly-datetime');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'user_data'
});

//登录(单个查询)
router.post('/api', (req, res) => {
    const { username, password } = req.body
    const sql = `select * from username where username='${username}' and password='${password}'`
    console.log('result:' + sql)
    connection.query(sql, (err, data) => {
        if (err) throw err;
        console.log('data:' + data)
        res.json(data)
    })
})

//首页订单
router.get('/order', function (req, res) {
    let { page, size, search } = req.query;
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
    let { w_id, w_username, w_phone, w_order_num, w_wl_status, w_address } = req.body;
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
    let { w_username, w_phone, w_order_num, w_wl_status, w_address } = req.body;
    let addTime = sd.format(new Date(), "YYYY-MM-DD HH:mm:ss")
    let addSql = `insert into wn_order (w_username,w_phone,w_order_num,w_wl_status,w_address,w_import_date) values('${w_username}','${w_phone}','${w_order_num}','${w_wl_status}','${w_address}','${addTime}')`;
    connection.query(addSql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })

})
//删除订单
router.post('/delete', (req, res) => {
    let { deleteId } = req.body;
    let delSql = `delete FROM wn_order where w_id=${deleteId}`;
    connection.query(delSql, (err, data) => {
        if (err) throw err;
        res.json(data)
    })

})

//点赞
router.get('/praise', (req, res) => {
    let { zan, date, id } = req.query;
    let newTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    let zanQuery = `select w_praise,w_praise_date from wn_order where w_id='${id}'`;
    let zanInsert = `update wn_order set w_praise='${++zan}',w_praise_date='${newTime}' where w_id='${id}'`
    connection.query(zanQuery, (err, data) => {
        if (err) throw err;
        if (new Date(data[0].w_praise_date).toDateString() === new Date().toDateString()) {
            // console.log('不能点赞了')
            res.json({serverStatus:0,msg:'今日已点过赞了'})
        } else {
            connection.query(zanInsert,(err, zan) => {
                if (err) throw err;
                console.log('赞成功')
                res.json(zan);

            })

        }
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
