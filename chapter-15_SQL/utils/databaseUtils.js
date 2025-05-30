const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Bhagyadeep12345',
  database: 'new_schema'
})
module.exports = pool;