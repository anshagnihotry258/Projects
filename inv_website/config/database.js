// ======================================================
// Database Configuration
// ======================================================
//
// Establishes a connection to the MySQL database using
// environment variables defined in the .env file.
//
// Environment Variables:
// - DB_HOST
// - DB_USER
// - DB_PASSWORD
// - DB_NAME
// - DB_PORT
// ======================================================

const mysql = require("mysql2");
require("dotenv").config();

// ======================================================
// Create Database Connection
// ======================================================

const db = mysql.createConnection({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    port: process.env.DB_PORT

});

// ======================================================
// Connect to MySQL
// ======================================================

db.connect((err) => {

    if (err) {

        console.error("❌ Failed to connect to MySQL");
        console.error(err.message);

        return;

    }

    console.log("✅ MySQL Connected Successfully");

});

// ======================================================
// Export Database Connection
// ======================================================

module.exports = db;