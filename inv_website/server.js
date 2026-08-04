// ======================================================
// IEEE Inventory Management System
// ======================================================
//
// Main Server File
//
// Responsibilities:
// - Configure Express
// - Register Middleware
// - Register Routes
// - Serve Frontend
// - Start Server
// ======================================================

const express = require("express");
const path = require("path");


require("dotenv").config();

// ======================================================
// Initialize Express Application
// ======================================================

const app = express();

// ======================================================
// Database Connection
// ======================================================

// Initializes MySQL connection.
require("./config/database");

// ======================================================
// Route Imports
// ======================================================

const itemRoutes = require("./routes/items");
const dashboardRoutes = require("./routes/dashboard");
const transactionRoutes = require("./routes/transactions");
const historyRoutes = require("./routes/history");

// ======================================================
// Middleware
// ======================================================

// Parse incoming JSON requests.
app.use(express.json());

// Serve static frontend files.
app.use(express.static(path.join(__dirname, "public")));

// ======================================================
// API Routes
// ======================================================

app.use("/api/items", itemRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/history", historyRoutes);


// ======================================================
// Start Server
// ======================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `🚀 IEEE Inventory Server running on http://localhost:${PORT}`
    );

});