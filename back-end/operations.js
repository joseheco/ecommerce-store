const mysql = require('mysql');

// function product(connection, callback){
//   connection.query("SELECT * FROM product", function(err, result){
//     if(err) throw err;
//     callback(result);

//   });
// }

// function categorie(connection, callback){
//   connection.query("SELECT * FROM category", function(err, result){
//     if(err) throw err;
//     callback(result);
//   });
// }

function product(pool, callback){
  pool.getConnection(function(err, connection){
    if(err) throw err;
  connection.query("SELECT * FROM product", function(err, result){
      if(err) throw err;
      callback(result);
      connection.release();
  });
  });
}

function productByCategory(pool, catName, callback){
  pool.getConnection(function(err, connection){
    if(err) throw err;
  connection.query(`SELECT * FROM (SELECT product.name, product.url_image, product.price, product.discount, category.name AS catName FROM product INNER JOIN category WHERE product.category = category.id) A WHERE A.catName = "${catName}"`, function(err, result){
      if(err) throw err;
      callback(result);
      connection.release();
  });
  });
}

function productsByName(pool, prodName, callback){
  pool.getConnection(function(err, connection){
    if(err) throw err;
  connection.query(`SELECT * FROM product WHERE name LIKE "%${prodName}%"`, function(err, result){
      if(err) throw err;
      callback(result);
      connection.release();
  });
  });
}

function categorie(pool, callback){
  pool.getConnection(function(err, connection){
    if(err) throw err;
  connection.query("SELECT * FROM category", function(err, result){
    if(err) throw err;
    callback(result);
  });
});
}

module.exports = { product, categorie, productByCategory, productsByName}