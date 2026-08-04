// ======================================================
// Dashboard Routes
// ======================================================
//
// Defines all routes related to dashboard statistics.
//
// Base Route:
// /api/dashboard
// ======================================================

const express = require("express");
const router = express.Router();

// ======================================================
// Controller Imports
// ======================================================

const {
    getDashboardStats
} = require("../controllers/dashboardController");

// ======================================================
// Routes
// ======================================================

/**
 * @route   GET /api/dashboard
 * @desc    Fetch dashboard statistics
 * @access  Public
 */
router.get("/", getDashboardStats);

// ======================================================
// Export Router
// ======================================================

module.exports = router;