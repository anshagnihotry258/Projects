let pieChart;
let barChart;

window.onload = function () {

    const pie = document.getElementById("pieChart");

    pieChart = new Chart(pie, {

        type: "pie",

        data: {

            labels: ["Stay", "Switch"],

            datasets: [{

                data: [0, 0],

                backgroundColor: [

                    "#ef4444",

                    "#22c55e"

                ]

            }]

        },

        options: {

            plugins: {

                legend: {

                    labels: {

                        color: "white"

                    }

                }

            }

        }

    });

    const bar = document.getElementById("barChart");

    barChart = new Chart(bar, {

        type: "bar",

        data: {

            labels: ["Stay", "Switch"],

            datasets: [{

                label: "Wins",

                data: [0, 0],

                backgroundColor: [

                    "#ef4444",

                    "#22c55e"

                ]

            }]

        },

        options: {

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "white"

                    }

                },

                x: {

                    ticks: {

                        color: "white"

                    }

                }

            },

            plugins: {

                legend: {

                    labels: {

                        color: "white"

                    }

                }

            }

        }

    });

};

function runPowerSimulation() {

    const p = Number(document.getElementById("powerInput").value);

    if (isNaN(p) || p < 0) {

        alert("Enter a valid power.");

        return;

    }

    simulate(Math.pow(10, p));

}

function runCustomSimulation() {

    const runs = Number(document.getElementById("customInput").value);

    if (isNaN(runs) || runs <= 0) {

        alert("Enter a valid number.");

        return;

    }

    simulate(runs);

}

function simulate(runs) {

    let stayWins = 0;

    let switchWins = 0;

    const start = performance.now();

    for (let i = 0; i < runs; i++) {

        const car = Math.floor(Math.random() * 3);

        const choice = Math.floor(Math.random() * 3);

        if (car === choice)

            stayWins++;

        else

            switchWins++;

    }

    const end = performance.now();

    const stayPercent = ((stayWins / runs) * 100).toFixed(4);

    const switchPercent = ((switchWins / runs) * 100).toFixed(4);

    document.getElementById("runs").textContent =
        runs.toLocaleString();

    document.getElementById("stayWins").textContent =
        stayWins.toLocaleString();

    document.getElementById("switchWins").textContent =
        switchWins.toLocaleString();

    document.getElementById("stayPercent").textContent =
        stayPercent + "%";

    document.getElementById("switchPercent").textContent =
        switchPercent + "%";

    document.getElementById("time").textContent =
        ((end - start) / 1000).toFixed(6) + " sec";

    pieChart.data.datasets[0].data = [

        stayWins,

        switchWins

    ];

    pieChart.update();

    barChart.data.datasets[0].data = [

        stayWins,

        switchWins

    ];

    barChart.update();

}

document.getElementById("playButton").addEventListener("click", playOneGame);

function playOneGame() {

    const doors = [

        document.getElementById("door1"),

        document.getElementById("door2"),

        document.getElementById("door3")

    ];

    doors.forEach(d => {

        d.innerHTML = "🚪";

    });

    const car = Math.floor(Math.random() * 3);

    const player = Math.floor(Math.random() * 3);

    let goatDoor = -1;

    for (let i = 0; i < 3; i++) {

        if (i !== car && i !== player) {

            goatDoor = i;

            break;

        }

    }

    setTimeout(() => {

        doors[goatDoor].innerHTML = "🐐";

    }, 700);

    setTimeout(() => {

        doors[car].innerHTML = "🚗";

    }, 1800);

}