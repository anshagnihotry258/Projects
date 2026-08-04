// ======================================================
// Transaction Routes
// ======================================================
//
// Defines all routes related to inventory transactions.
//
// Base Route:
// /api/transactions
// ======================================================

const express = require("express");
const router = express.Router();

// ======================================================
// Controller Imports
// ======================================================

const {
    borrowItem
} = require("../controllers/transactionController");

// ======================================================
// Routes
// ======================================================

/**
 * @route   POST /api/transactions/borrow
 * @desc    Borrow an inventory item
 * @access  Public
 */
router.post("/borrow", borrowItem);

// ======================================================
// Export Router
// ======================================================

module.exports = router;