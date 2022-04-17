const mysql = require('mysql');

function product(connection, callback){
  connection.query("SELECT * FROM product", function(err, result){
    if(err) throw err;
    callback(result);
  });
}

function categorie(connection, callback){
  connection.query("SELECT * FROM category", function(err, result){
    if(err) throw err;
    callback(result);
  });
}

module.exports = { product, categorie }