// ======================================================
// Transaction Controller
// ======================================================
//
// Handles all inventory transactions.
//
// Current Features:
// - Borrow Item
//
// Future Features:
// - Return Item
// - Transaction Rollback
// - Transaction Filters
// ======================================================

const db = require("../config/database");

// ======================================================
// Borrow Item
// ======================================================

/**
 * @route   POST /api/transactions/borrow
 * @desc    Borrow an inventory item
 * @access  Public
 */
const borrowItem = (req, res) => {

    // Extract request data
    const {
        item_id,
        borrowed_by,
        quantity,
        purpose
    } = req.body || {};

    // --------------------------------------------------
    // Validate Request
    // --------------------------------------------------

    if (!item_id || !borrowed_by || !quantity) {

        return res.status(400).json({
            success: false,
            message: "Required fields are missing."
        });

    }

    // --------------------------------------------------
    // Step 1 : Check if the requested item exists
    // --------------------------------------------------

    const checkItemQuery =
        "SELECT * FROM items WHERE id = ?";

    db.query(checkItemQuery, [item_id], (err, result) => {

        // Database Error
        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        // Item does not exist
        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Item not found."
            });

        }

        const item = result[0];

        // --------------------------------------------------
        // Step 2 : Check Available Stock
        // --------------------------------------------------

        if (item.quantity < quantity) {

            return res.status(400).json({
                success: false,
                message: "Not enough stock available."
            });

        }

        // --------------------------------------------------
        // Step 3 : Reduce Inventory Quantity
        // --------------------------------------------------

        const updateQuantityQuery = `
            UPDATE items
            SET quantity = quantity - ?
            WHERE id = ?
        `;

        db.query(
            updateQuantityQuery,
            [quantity, item_id],
            (err) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                // ------------------------------------------
                // Step 4 : Save Borrow Transaction
                // ------------------------------------------

                const insertTransactionQuery = `
                    INSERT INTO transactions
                    (
                        item_id,
                        borrowed_by,
                        quantity,
                        transaction_type,
                        purpose
                    )
                    VALUES
                    (
                        ?,
                        ?,
                        ?,
                        'Borrow',
                        ?
                    )
                `;

                db.query(
                    insertTransactionQuery,
                    [
                        item_id,
                        borrowed_by,
                        quantity,
                        purpose
                    ],
                    (err) => {

                        if (err) {

                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });

                        }

                        // ----------------------------------
                        // Borrow Successful
                        // ----------------------------------

                        return res.status(200).json({

                            success: true,
                            message: "Item borrowed successfully."

                        });

                    }
                );

            }
        );

    });

};

// ======================================================
// Export Controller Functions
// ======================================================

module.exports = {
    borrowItem
};