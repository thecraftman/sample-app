const express = require('express')
const mysql = require('mysql')

const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0'

console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PORT)


/*
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: 'dev'
});

connection.connect(function(err) {
  if (err) {
    return console.error('MySQL connection error: ' + err.message);
  }

  console.log('Connected to the MySQL server successfully');
});
*/
const api = express()
api.get('/', (req, res) => {
  res.send('PROD-115\n')
})

api.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
