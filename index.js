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
  res.send('"precedingHash": "f556af85a25f2883d26b011d04117f3a82f6c9e2d8bd897510c13ec14e61f","hash": "0000ffaf7b9ae573a9cb3ba606b78dc45a8944ce6ffb0fcbee505b942d8b3e05","nonce": 65066\n')
})

api.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
