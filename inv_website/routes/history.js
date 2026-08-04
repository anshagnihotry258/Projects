// ======================================================
// Transaction History Routes
// ======================================================
//
// Defines all routes related to transaction history.
//
// Base Route:
// /api/history
// ======================================================

const express = require("express");
const router = express.Router();

// ======================================================
// Controller Imports
// ======================================================

const {
    getTransactions
} = require("../controllers/transactionHistoryController");

// ======================================================
// Routes
// ======================================================

/**
 * @route   GET /api/history
 * @desc    Fetch complete transaction history
 * @access  Public
 */
router.get("/", getTransactions);

// ======================================================
// Export Router
// ======================================================

module.exports = router;

