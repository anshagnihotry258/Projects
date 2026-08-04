// ======================================================
// Dashboard Controller
// ======================================================
//
// Handles all dashboard-related operations.
//
// Features:
// - Fetch inventory statistics
//
// Dashboard Statistics:
// - Total Unique Items
// - Total Inventory Quantity
// - Total Categories
// - Low Stock Items
// ======================================================

const db = require("../config/database");

// ======================================================
// Get Dashboard Statistics
// ======================================================

/**
 * @route   GET /api/dashboard
 * @desc    Fetch dashboard summary statistics
 * @access  Public
 */
const getDashboardStats = (req, res) => {

    // --------------------------------------------------
    // Dashboard Statistics Query
    //
    // Retrieves:
    // 1. Total number of inventory items
    // 2. Total quantity available
    // 3. Number of unique categories
    // 4. Number of items with low stock
    // --------------------------------------------------

    const dashboardQuery = `
        SELECT

            COUNT(*) AS totalItems,

            SUM(quantity) AS totalInventory,

            COUNT(DISTINCT category) AS totalCategories,

            SUM(
                CASE
                    WHEN quantity <= min_quantity THEN 1
                    ELSE 0
                END
            ) AS lowStockItems

        FROM items;
    `;

    db.query(dashboardQuery, (err, result) => {

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

            data: result[0]

        });

    });

};

// ======================================================
// Export Controller Functions
// ======================================================

module.exports = {
    getDashboardStats
};