// ======================================================
// Transaction History Controller
// ======================================================
//
// Handles all operations related to inventory
// transaction history.
//
// Current Features:
// - Fetch complete transaction history
//
// Future Features:
// - Filter by date
// - Filter by user
// - Export CSV
// - Pagination
// ======================================================

const db = require("../config/database");

// ======================================================
// Get Complete Transaction History
// ======================================================

/**
 * @route   GET /api/history
 * @desc    Fetch complete inventory transaction history
 * @access  Public
 */
const getTransactions = (req, res) => {

    // SQL Query:
    // Join the transactions table with the items table
    // to retrieve the item name instead of only the item ID.

    const sql = `
        SELECT
            t.id,
            i.item_name,
            t.borrowed_by,
            t.quantity,
            t.transaction_type,
            t.purpose,
            t.transaction_date

        FROM transactions AS t

        INNER JOIN items AS i
            ON t.item_id = i.id

        ORDER BY t.transaction_date DESC;
    `;

    db.query(sql, (err, result) => {

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
// Export Controller Functions
// ======================================================

module.exports = {
    getTransactions
};