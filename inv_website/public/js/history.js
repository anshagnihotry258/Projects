
// Apply saved theme

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}
async function loadHistory() {

    const result =
        await getTransactions();

    renderTransactions(result.data);

}

loadHistory();