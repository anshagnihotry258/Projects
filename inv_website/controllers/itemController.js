// ======================================================
// Item Controller
// ======================================================
//
// Handles all inventory item operations.
//
// Features:
// - Get all items
// - Get single item
// - Add new item
// - Update existing item
// - Delete item
// ======================================================

const db = require("../config/database");

// ======================================================
// Get All Inventory Items
// ======================================================

/**
 * @route   GET /api/items
 * @desc    Fetch all inventory items
 * @access  Public
 */
const getAllItems = (req, res) => {

    const getItemsQuery = `
        SELECT *
        FROM items
    `;

    db.query(getItemsQuery, (err, result) => {

        // Database Error
        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        // Success Response
        return res.status(200).json({

            success: true,

            count: result.length,

            data: result

        });

    });

};

// ======================================================
// Get Single Item
// ======================================================

/**
 * @route   GET /api/items/:id
 * @desc    Fetch a single inventory item
 * @access  Public
 */
const getItemById = (req, res) => {

    const { id } = req.params;

    const getItemQuery = `
        SELECT *
        FROM items
        WHERE id = ?
    `;

    db.query(getItemQuery, [id], (err, result) => {

        // Database Error
        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        // Item Not Found
        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Item not found."
            });

        }

        // Success Response
        return res.status(200).json({

            success: true,

            data: result[0]

        });

    });

};

// ======================================================
// Add New Item
// ======================================================

/**
 * @route   POST /api/items
 * @desc    Add a new inventory item
 * @access  Public
 */
const addItem = (req, res) => {

    const {
        item_name,
        category,
        quantity,
        min_quantity,
        description
    } = req.body || {};

    // Validate Required Fields
    if (!item_name || !category) {

        return res.status(400).json({
            success: false,
            message: "Item name and category are required."
        });

    }

    const insertItemQuery = `
        INSERT INTO items
        (
            item_name,
            category,
            quantity,
            min_quantity,
            description
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(

        insertItemQuery,

        [
            item_name,
            category,
            quantity || 0,
            min_quantity || 5,
            description || null
        ],

        (err, result) => {

            // Database Error
            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            // Success Response
            return res.status(201).json({

                success: true,

                message: "Item added successfully.",

                data: {

                    id: result.insertId,

                    item_name,

                    category,

                    quantity,

                    min_quantity,

                    description

                }

            });

        }

    );

};

// ======================================================
// Update Existing Item
// ======================================================

/**
 * @route   PUT /api/items/:id
 * @desc    Update an existing inventory item
 * @access  Public
 */
const updateItem = (req, res) => {

    const { id } = req.params;

    const {
        item_name,
        category,
        quantity,
        min_quantity,
        description
    } = req.body || {};

    // Validate Required Fields
    if (!item_name || !category) {

        return res.status(400).json({
            success: false,
            message: "Item name and category are required."
        });

    }

    const updateItemQuery = `
        UPDATE items
        SET
            item_name = ?,
            category = ?,
            quantity = ?,
            min_quantity = ?,
            description = ?
        WHERE id = ?
    `;

    db.query(

        updateItemQuery,

        [
            item_name,
            category,
            quantity,
            min_quantity,
            description,
            id
        ],

        (err, result) => {

            // Database Error
            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            // Item Not Found
            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Item not found."
                });

            }

            // Success Response
            return res.status(200).json({

                success: true,

                message: "Item updated successfully."

            });

        }

    );

};

// ======================================================
// Delete Item
// ======================================================

/**
 * @route   DELETE /api/items/:id
 * @desc    Delete an inventory item
 * @access  Public
 */
const deleteItem = (req, res) => {

    const { id } = req.params;

    const deleteItemQuery = `
        DELETE FROM items
        WHERE id = ?
    `;

    db.query(deleteItemQuery, [id], (err, result) => {

        // Database Error
        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        // Item Not Found
        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Item not found."
            });

        }

        // Success Response
        return res.status(200).json({

            success: true,

            message: "Item deleted successfully."

        });

    });

};

// ======================================================
// Export Controller Functions
// ======================================================

module.exports = {
    getAllItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem
};