const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
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

const pool = mysql.createPool(db_config)
const connected = mysql.createConnection(db_config)

connected.connect((err) => {
if (err) {;
      console.log("Error: " + err.stack);
      return;
    }
    console.log("Connect DB")
  })

  app.get("/product", (req, res) => {
  product(pool,(result) => {
    res.json(result);
  })
})

app.get("/product/category/:catName", (req, res) => {
  productByCategory(pool,req.params.catName,(result) => {
    res.json(result);
  })
})

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

// pool.on('connection', function (connection) {
//   connection.query('SET SESSION auto_increment_increment=1')
// });

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});


function handleDisconnect(){
//   const connection = mysql.createConnection(db_config);

// connection.connect((err) => {
//   if (err) {;
//     console.log("Error: " + err.stack);
//     return;
//   }
//   console.log("Connect DB")
// })

connected.on('error', function(err) {
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
    handleDisconnect();                         
  } else {                                      
    throw err;                                 
  }
});

// app.get("/product", (req, res) => {
//   product(connection,(result) => {
//     res.json(result);
//   })
// })

// app.get("/categorie", (req, res) => {
//   categorie(connection,(result) => {
//     res.json(result);
//   })
// })
}

handleDisconnect();

app.listen(8080, () => {
  console.log("servidor 8080...");
})


// const AWS = require('aws-sdk');
// // http or https
// const http = require('http');
// const agent = new http.Agent({
//   keepAlive: true, 
// // Infinity is read as 50 sockets
//   maxSockets: Infinity
// });

// AWS.config.update({
//   httpOptions: {
//     agent
//   }
// });
