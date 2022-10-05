const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "Password123",
    database: "estore"
})

module.exports= db;