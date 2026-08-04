// ======================================================
// API Configuration
// ======================================================
//
// Contains all functions responsible for communicating
// with the backend REST API.
//
// NOTE:
// This file should ONLY contain API requests.
// No UI rendering or business logic belongs here.
// ======================================================

// Base URL for all backend API requests
const API_URL = "http://localhost:3000/api";

// ======================================================
// Dashboard APIs
// ======================================================

/**
 * @route GET /api/dashboard
 * @desc Fetch dashboard statistics
 */
async function getDashboard() {

    const response = await fetch(`${API_URL}/dashboard`);

    return await response.json();

}

// ======================================================
// Item APIs
// ======================================================

/**
 * @route GET /api/items
 * @desc Fetch all inventory items
 */
async function getItems() {

    const response = await fetch(`${API_URL}/items`);

    return await response.json();

}

/**
 * @route GET /api/items/:id
 * @desc Fetch a single inventory item
 */
async function getItemById(id) {

    const response = await fetch(`${API_URL}/items/${id}`);

    return await response.json();

}

/**
 * @route POST /api/items
 * @desc Add a new inventory item
 */
async function addItem(item) {

    const response = await fetch(`${API_URL}/items`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(item)

    });

    return await response.json();

}

/**
 * @route PUT /api/items/:id
 * @desc Update an existing inventory item
 */
async function updateItem(id, item) {

    const response = await fetch(`${API_URL}/items/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(item)

    });

    return await response.json();

}

/**
 * @route DELETE /api/items/:id
 * @desc Delete an inventory item
 */
async function deleteItem(id) {

    const response = await fetch(`${API_URL}/items/${id}`, {

        method: "DELETE"

    });

    return await response.json();

}



// ======================================================
// Transaction APIs
// ======================================================

/**
 * @route POST /api/transactions/borrow
 * @desc Borrow an inventory item
 */


async function borrowItem(data) {

    const response = await fetch(`${API_URL}/transactions/borrow`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    return await response.json();

}

// ======================================================
// Analytics APIs
// ======================================================

// Overview Cards
async function getAnalyticsOverview() {

    const response =
        await fetch(`${API_URL}/analytics/overview`);

    return await response.json();

}

// Pie Chart
async function getCategoryDistribution() {

    const response =
        await fetch(`${API_URL}/analytics/category`);

    return await response.json();

}

// Bar Chart
async function getTopBorrowedItems() {

    const response =
        await fetch(`${API_URL}/analytics/top-borrowed`);

    return await response.json();

}

// Line Chart
async function getMonthlyTrend() {

    const response =
        await fetch(`${API_URL}/analytics/monthly-trend`);

    return await response.json();

}

// Recent Activity
async function getRecentActivity() {

    const response =
        await fetch(`${API_URL}/analytics/activity`);

    return await response.json();

}

// Insights
async function getInsights() {

    const response =
        await fetch(`${API_URL}/analytics/insights`);

    return await response.json();

}

/**
 * @route GET /api/history
 * @desc Fetch complete transaction history
 */
async function getTransactions() {

    const response = await fetch(`${API_URL}/history`);

    return await response.json();

}