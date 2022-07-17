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
  res.send('PROD-114\n')
})

api.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)



const SHA256 = require("crypto-js/sha256");

// constants 

// const PORT = 8080;
// const HOST = '0.0.0.0'; 

class CryptoBlock {
  constructor(index, timestamp, data, precedingHash = " ") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

class CryptoBlockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
    this.difficulty = 4;
  }
  startGenesisBlock() {
    return new CryptoBlock(0, "01/01/2020", "Initial Block in the Chain", "0");
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    //newBlock.hash = newBlock.computeHash();
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}

let ctoaiCoin = new CryptoBlockchain();

console.log("Workflow mining in progress....");
ctoaiCoin.addNewBlock(
  new CryptoBlock(1, "13/07/2022", {
    sender: "CTO.ai",
    recipient: "Workflow",
    quantity: 100
  })
);

ctoaiCoin.addNewBlock(
  new CryptoBlock(2, "03/06/2021", {
    sender: "Salman Jonah",
    recipient: "pol king",
    quantity: 100
  })
);

console.log(JSON.stringify(ctoaiCoin, null, 4));

