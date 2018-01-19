var mysql = require('mysql');

class GeneralPurposeMySQLConnection {
  constructor () {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: 'general'
    });
  }
}

module.exports = GeneralPurposeMySQLConnection;