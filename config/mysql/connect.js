var mysql = require('mysql');

var conexion = mysql.createConnection({
host: 'localhost',
 user: 'root',
 password: 'chinchulin',
 database: 'complaint',
 port: 3306
});

conexion.connect(function (error) {
 if (error) {
   console.log(error);
   console.log('connection failed');
 }
 else {
   console.log('MySQL connection');
 }
});

module.exports = conexion;