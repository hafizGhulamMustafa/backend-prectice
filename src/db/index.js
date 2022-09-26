const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "",
    database: "estore"
})

module.exports= db;