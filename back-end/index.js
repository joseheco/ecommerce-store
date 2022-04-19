const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
require("dotenv").config();

const { product, categorie, productByCategory, productsByName } = require("./operations");

app.use(cors());
app.use(express.json());

const db_config = {
host: process.env.DBHOST,
user: process.env.DBUSER,
password: process.env.DBPASSWORD,
database: process.env.DATABASE,
}

const connected = mysql.createConnection(db_config)
const pool = mysql.createPool(db_config)

connected.connect((err) => {
if (err) {
  console.log("Error: " + err.stack);
    return;
  }
console.log("Connect DB");
});

app.get("/product", (req, res) => {
  product(pool,(result) => {
    res.json(result);
  });
});

app.get("/product/category/:catName", (req, res) => {
  productByCategory(pool,req.params.catName,(result) => {
    res.json(result);
  });
});

app.get("/product/search/:prodName", (req, res) => {
  productsByName(pool,req.params.prodName,(result) => {
    res.json(result);
  })
})

app.get("/category", (req, res) => {
  categorie(pool,(result) => {
    res.json(result);
  })
})

pool.on('acquire', function(connection) {
  console.log('Connection %d acquired', connection.threadId);
});

function handleDisconnect(){
connected.on('error', function(err) {
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
    handleDisconnect();                         
  } else {                                      
    throw err;                                 
  }
});
}

handleDisconnect();

app.listen(process.env.PORT || 3000, () => {
  console.log("server connected...");
})
