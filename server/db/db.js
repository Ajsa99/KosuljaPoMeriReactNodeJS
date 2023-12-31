// const mysql = require('mysql2');

// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "Alibasic1",
//     database: "kosuljapomeri",
// });


// module.exports = db;

const mysql = require('mysql2')
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;