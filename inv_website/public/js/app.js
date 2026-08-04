// ----------------------------
// Refresh Dashboard & Table
// ----------------------------
// Apply saved theme


if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

}
if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}
let mode = "add";
let currentItemId = null;
let deleteItemId = null;
let allItems = [];  
let deleteItemName = "";
async function refreshData() {

const dashboard = await getDashboard();

if (dashboard.success) {
    renderDashboard(dashboard.data);
}

const items =
    await getItems();

if(items.success){

    allItems = items.data;

    renderItems(allItems);
    const history =
    await getTransactions();

if(history.success){

    renderRecentActivity(history.data);

}

}
}


// ----------------------------
// Initialize App
// ----------------------------

async function initialize() {

    try {

        await refreshData();

    }

    catch (error) {

        console.error(error);

    }

}

initialize();

document
.getElementById("searchInput")
.addEventListener("input",(e)=>{

    console.log("Typing...", e.target.value);

    searchItems(e.target.value);

});



async function openEditModal(id){

    const response =
        await fetch(`${API_URL}/items/${id}`);

const result = await getItemById(id);
    const item =
        result.data;

    mode = "edit";

    currentItemId = id;

    document.getElementById("modalTitle").textContent =
        "Edit Item";

    document.getElementById("saveItemBtn").textContent =
        "Update Item";

    document.getElementById("itemName").value =
        item.item_name;

    document.getElementById("category").value =
        item.category;

    document.getElementById("quantity").value =
        item.quantity;

    document.getElementById("minQuantity").value =
        item.min_quantity;

    document.getElementById("description").value =
        item.description;

    document
        .getElementById("itemModal")
        .classList
        .remove("hidden");

}


// ----------------------------
// Add Item Form
// ----------------------------

const form =
    document.getElementById("itemForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const saveButton =
        form.querySelector('button[type="submit"]');

    saveButton.disabled = true;

    saveButton.textContent = "Saving...";

    const item = {

        item_name:
            document.getElementById("itemName").value,

        category:
            document.getElementById("category").value,

        quantity:
            Number(document.getElementById("quantity").value),

        min_quantity:
            Number(document.getElementById("minQuantity").value),

        description:
            document.getElementById("description").value

    };

    try {

let result;

if(mode==="add"){

    result =
        await addItem(item);

}
else{

    result =
        await updateItem(currentItemId,item);

}

if (result.success) {

    showToast(
        mode === "add"
            ? "Item Added Successfully!"
            : "Item Updated Successfully!"
    );

    // Close modal
    document
        .getElementById("itemModal")
        .classList
        .add("hidden");

    // Clear form
    form.reset();

    // Reset mode back to Add
    mode = "add";
    currentItemId = null;

    // Restore modal title
    document.getElementById("modalTitle").textContent =
        "Add New Item";

    // Restore button text
    document.getElementById("saveItemBtn").textContent =
        "Save Item";

    // Reload dashboard & table
    await refreshData();

}

        else {

            showToast(result.message, "error");

        }

    }

    catch (error) {

        showToast("Something went wrong!", "error");

    console.error("Failed to load dashboard:", error);

    }

    finally {

        saveButton.disabled = false;

        saveButton.textContent = "Save Item";

    }

});

// ----------------------------
// Search Inventory
// ----------------------------

function searchItems(searchText) {

    searchText = searchText.toLowerCase().trim();

    const filteredItems = allItems.filter(item => {

        return (

            item.item_name.toLowerCase().includes(searchText)

            ||

            item.category.toLowerCase().includes(searchText)

            ||

            (item.description || "")
                .toLowerCase()
                .includes(searchText)

        );

    });

    renderItems(filteredItems);

}

// ----------------------------
// Event Delegation
// (Edit/Delete/Borrow)
// ----------------------------

document
    .getElementById("inventoryTable")
    .addEventListener("click", async (event) => {

        const button = event.target.closest("button");

        if (!button) return;

        const id = button.dataset.id;

        if (!id) return;

        // =============================
        // Edit Item
        // =============================

        if (button.classList.contains("edit-btn")) {

            await openEditModal(id);

        }

        // =============================
        // Delete Item
        // =============================

        else if (button.classList.contains("delete-btn")) {

            deleteItemId = id;

            deleteItemName = button.dataset.name;

            document.getElementById("deleteMessage").innerHTML = `

                Are you sure you want to delete

                <br><br>

                <strong>${deleteItemName}</strong> ?

                <br><br>

                This action cannot be undone.

            `;

            document
                .getElementById("deleteModal")
                .classList
                .remove("hidden");

        }

        // =============================
        // Borrow Item
        // =============================

        else if (button.classList.contains("borrow-btn")) {

            borrowItemData =
                allItems.find(item => item.id == id);

            document.getElementById("borrowItemId").value =
                borrowItemData.id;

            document.getElementById("borrowItemName").value =
                borrowItemData.item_name;

            document.getElementById("availableQuantity").value =
                borrowItemData.quantity;

            document
                .getElementById("borrowModal")
                .classList
                .remove("hidden");

        }

    });
document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", async () => {

        const result =
            await deleteItem(deleteItemId);

        if (result.success) {

            showToast("Item Deleted Successfully");

            document
                .getElementById("deleteModal")
                .classList
                .add("hidden");

            deleteItemId = null;
            deleteItemName = "";

            await refreshData();

        }
        else {

            showToast(result.message, "error");

        }

    });

document
    .getElementById("cancelDeleteBtn")
    .addEventListener("click", () => {

        deleteItemId = null;
        deleteItemName = "";

        document
            .getElementById("deleteModal")
            .classList
            .add("hidden");

    });

    document
.getElementById("cancelBorrowBtn")
.addEventListener("click",()=>{

    document
        .getElementById("borrowModal")
        .classList
        .add("hidden");

    document
        .getElementById("borrowForm")
        .reset();

});

document
.getElementById("borrowForm")
.addEventListener("submit",async(e)=>{

    e.preventDefault();

const data = {

    item_id: Number(
        document.getElementById("borrowItemId").value
    ),

    borrowed_by:
        document.getElementById("borrowedBy").value,

    quantity: Number(
        document.getElementById("borrowQuantity").value
    ),

    purpose:
        document.getElementById("borrowPurpose").value

};

// =============================
// Frontend Validation
// =============================

const available = Number(
    document.getElementById("availableQuantity").value
);

if (data.quantity <= 0) {

    showToast(
        "Enter a valid quantity.",
        "error"
    );

    return;

}

if (data.quantity > available) {

    showToast(
        "Borrow quantity exceeds available stock.",
        "error"
    );

    return;

}

// =============================
// Send Request to Backend
// =============================

const result =
    await borrowItem(data);

    if(result.success){

        showToast("Item Borrowed Successfully");

        document
            .getElementById("borrowModal")
            .classList
            .add("hidden");

        document
            .getElementById("borrowForm")
            .reset();

        await refreshData();

    }

    else{

        showToast(result.message,"error");

    }

});

