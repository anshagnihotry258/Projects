// ======================================================
// Item Routes
// ======================================================
//
// Defines all routes related to inventory items.
//
// Base Route:
// /api/items
// ======================================================

const express = require("express");
const router = express.Router();

// ======================================================
// Controller Imports
// ======================================================

const {
    getAllItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem
} = require("../controllers/itemController");

// ======================================================
// Routes
// ======================================================

/**
 * @route   GET /api/items
 * @desc    Fetch all inventory items
 * @access  Public
 */
router.get("/", getAllItems);

/**
 * @route   GET /api/items/:id
 * @desc    Fetch a single inventory item
 * @access  Public
 */
router.get("/:id", getItemById);

/**
 * @route   POST /api/items
 * @desc    Add a new inventory item
 * @access  Public
 */
router.post("/", addItem);

/**
 * @route   PUT /api/items/:id
 * @desc    Update an existing inventory item
 * @access  Public
 */
router.put("/:id", updateItem);

/**
 * @route   DELETE /api/items/:id
 * @desc    Delete an inventory item
 * @access  Public
 */
router.delete("/:id", deleteItem);

// ======================================================
// Export Router
// ======================================================

module.exports = router;