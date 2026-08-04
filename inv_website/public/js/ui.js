if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

}

// Dashboard Cards

function renderDashboard(stats) {

    document.getElementById("totalItems").textContent =
        stats.totalItems;

    document.getElementById("totalInventory").textContent =
        stats.totalInventory;

    document.getElementById("totalCategories").textContent =
        stats.totalCategories;

    const lowStock = document.getElementById("lowStockItems");

    lowStock.textContent = stats.lowStockItems;

    if (Number(stats.lowStockItems) > 0) {

        lowStock.style.color = "#DC2626";

    } else {

        lowStock.style.color = "#10B981";

    }

}


function renderRecentActivity(transactions){

    const container =
        document.getElementById("recentActivity");

    if(!container) return;

    if(transactions.length===0){

        container.innerHTML=`

            <p class="loading">

                No recent activity.

            </p>

        `;

        return;

    }

    let html="";

    transactions
        .slice(0,5)
        .forEach(transaction=>{

            html+=`

            <div class="activity-item">

                <div class="activity-left">

                    <div class="activity-icon">

                        <i class="fa-solid fa-box"></i>

                    </div>

                    <div>

                        <strong>

                            ${transaction.item_name}

                        </strong>

                        <br>

                        Borrowed by
                        ${transaction.borrowed_by}

                    </div>

                </div>

                <div class="activity-time">

                    ${new Date(transaction.transaction_date)
                        .toLocaleDateString()}

                </div>

            </div>

            `;

        });

    container.innerHTML=html;

}

// Inventory Table

function renderItems(items) {
    const table =
        document.getElementById("inventoryTable");

    let rows = "";
    if(items.length===0){

table.innerHTML = `

<tr>

    <td colspan="6">

        <div class="empty-state">

            <i class="fa-solid fa-box-open"></i>

            <h3>

                No Items Found

            </h3>

            <p>

                No inventory matches your search.

            </p>

        </div>

    </td>

</tr>

`;

return;
    

    return;
}



    items.forEach(item => {
    
let status;

if (item.quantity === 0) {

    status = `
        <span class="badge out-stock">
            🔴 Out of Stock
        </span>
    `;

}
else if (item.quantity <= item.min_quantity) {

    status = `
        <span class="badge low-stock">
            🟠 Low Stock
        </span>
    `;

}
else {

    status = `
        <span class="badge available">
            🟢 Available
        </span>
    `;

}

        rows += `

        <tr>

            <td>${item.id}</td>

            <td>${item.item_name}</td>

            <td>${item.category}</td>

            <td>${item.quantity}</td>

            <td>${status}</td>

        <td>

    <div class="action-buttons">

        <button
            class="action-btn edit-btn"
            data-id="${item.id}"
            title="Edit Item">

            <i class="fa-solid fa-pen"></i>

        </button>

        <button
            class="action-btn delete-btn"
            data-id="${item.id}"
            data-name="${item.item_name}"
            title="Delete Item">

            <i class="fa-solid fa-trash"></i>

        </button>

        <button
            class="action-btn borrow-btn"
            data-id="${item.id}"
            title="Borrow Item">

            <i class="fa-solid fa-hand-holding"></i>

        </button>

    </div>

</td>

        </tr>

        `;

    });

    table.innerHTML = rows;

}


// Modal

const modal =
    document.getElementById("itemModal");

document
    .getElementById("addItemBtn")
    .addEventListener("click", () => {

        modal.classList.remove("hidden");

    });

document
    .getElementById("cancelBtn")
    .addEventListener("click", () => {

        modal.classList.add("hidden");

    });

    function renderTransactions(transactions) {

    const table =
        document.getElementById("historyTable");

    let rows = "";

    transactions.forEach(transaction => {

        rows += `

        <tr>

            <td>

                ${new Date(transaction.transaction_date)
                    .toLocaleString()}

            </td>

            <td>

                ${transaction.item_name}

            </td>

            <td>

                ${transaction.borrowed_by}

            </td>

            <td>

                ${transaction.quantity}

            </td>

            <td>

                ${transaction.transaction_type}

            </td>

            <td>

                ${transaction.purpose}

            </td>

        </tr>

        `;

    });

    table.innerHTML = rows;

}