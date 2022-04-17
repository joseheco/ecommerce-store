const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

const { read } = require("./operations");
app.use(express.json());

const db_config = {
host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
user: 'bsale_test',
password: 'bsale_test',
database: 'bsale_test',
}

function handleDisconnect(){
  const connection = mysql.createConnection(db_config);

connection.connect((err) => {
  if (err) {;
    console.log("Error: " + err.stack);
    return;
  }
  console.log("Connect DB")
})

connection.on('error', function(err) {
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
    handleDisconnect();                         
  } else {                                      
    throw err;                                 
  }
});

app.use("/read", (req, res) => {
  read(connection,(result) => {
    res.json(result);
  })
})

app.get("/read", (req, res) => {
  read(connection,(result) => {
    res.json(result);
  })
})
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