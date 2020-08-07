var mysql      = require('mysql');
//创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123654',
  database : 'user_data'
});

// 可以通过以下命令查看当前的mysql连接数：
// mysqladmin -uroot -proot processlist
module.exports = connection;

