if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

}

async function loadDashboardSummary() {

    try {

        const result = await getDashboard();

        if (!result.success) return;

        const stats = result.data;

       // ==========================================
// Animate Number
// ==========================================

function animateCounter(elementId, target){

    const element =
        document.getElementById(elementId);

    let current = 0;

    const increment =
        Math.max(1, Math.ceil(target / 40));

    const timer = setInterval(()=>{

        current += increment;

        if(current >= target){

            current = target;

            clearInterval(timer);

        }

        element.textContent = current;

    },25);

}

animateCounter(
    "totalItems",
    stats.totalItems
);

animateCounter(
    "totalInventory",
    stats.totalInventory
);

animateCounter(
    "totalCategories",
    stats.totalCategories
);

animateCounter(
    "lowStockItems",
    stats.lowStockItems
);

        document.getElementById("totalInventory").textContent =
            stats.totalInventory;

        document.getElementById("totalCategories").textContent =
            stats.totalCategories;

        document.getElementById("lowStockItems").textContent =
            stats.lowStockItems;

    }

    catch (error) {

        console.error(error);

    }

}

// ===========================================
// FAQ Accordion
// ===========================================

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const question =
        item.querySelector(".faq-question");

    question.addEventListener("click",()=>{

        faqItems.forEach(f=>{

            if(f!==item){

                f.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

// ===========================================
// Theme Toggle
// ===========================================

const themeButton =
    document.getElementById("themeToggle");

// Load saved theme
const savedTheme =
    localStorage.getItem("theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark");

    themeButton.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeButton.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeButton.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

    else{

        localStorage.setItem("theme","light");

        themeButton.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});
const observer =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show-section");

}

});

});

document
.querySelectorAll("section")
.forEach(section=>{

section.classList.add("hidden-section");

observer.observe(section);

});
const button =
document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

button.style.display =
window.scrollY>400
?"block":"none";

});

button.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


loadDashboardSummary();