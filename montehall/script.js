/* -------------------------------
   GLOBAL VARIABLES
--------------------------------*/

let pieChart;
let barChart;

/* -------------------------------
   INITIALIZE CHARTS
--------------------------------*/

window.onload = function () {

    initializeCharts();

};

/* -------------------------------
   CREATE CHARTS
--------------------------------*/

function initializeCharts() {

    const pieCanvas = document.getElementById("pieChart");

    pieChart = new Chart(pieCanvas, {

        type: "pie",

        data: {

            labels: [

                "Stay",

                "Switch"

            ],

            datasets: [

                {

                    data: [0,0],

                    backgroundColor: [

                        "#ef4444",

                        "#22c55e"

                    ],

                    borderWidth:2

                }

            ]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    labels:{

                        color:"white",

                        font:{

                            size:16

                        }

                    }

                }

            }

        }

    });

    const barCanvas = document.getElementById("barChart");

    barChart = new Chart(barCanvas,{

        type:"bar",

        data:{

            labels:[

                "Stay",

                "Switch"

            ],

            datasets:[{

                label:"Wins",

                data:[0,0],

                backgroundColor:[

                    "#ef4444",

                    "#22c55e"

                ]

            }]

        },

        options:{

            responsive:true,

            scales:{

                x:{

                    ticks:{

                        color:"white"

                    }

                },

                y:{

                    beginAtZero:true,

                    ticks:{

                        color:"white"

                    }

                }

            },

            plugins:{

                legend:{

                    labels:{

                        color:"white"

                    }

                }

            }

        }

    });

}

/* -------------------------------
   BUTTON FUNCTIONS
--------------------------------*/

function runPowerSimulation(){

    const power = Number(

        document.getElementById("powerInput").value

    );

    if(isNaN(power) || power<0){

        alert("Please enter a valid power.");

        return;

    }

    simulate(

        Math.pow(10,power)

    );

}

function runCustomSimulation(){

    const runs = Number(

        document.getElementById("customInput").value

    );

    if(isNaN(runs) || runs<=0){

        alert("Please enter a valid number.");

        return;

    }

    simulate(runs);

}

/* -------------------------------
   MAIN SIMULATION
--------------------------------*/

function simulate(runs){

    let stayWins=0;

    let switchWins=0;

    const start=performance.now();

    for(let i=0;i<runs;i++){

        const car=

            Math.floor(

                Math.random()*3

            );

        const choice=

            Math.floor(

                Math.random()*3

            );

        if(choice===car)

            stayWins++;

        else

            switchWins++;

    }

    const end=performance.now();

    const seconds=

        (end-start)/1000;

    const stayPercent=

        (

            stayWins*100/runs

        ).toFixed(4);

    const switchPercent=

        (

            switchWins*100/runs

        ).toFixed(4);

    const speed=

        Math.round(

            runs/seconds

        );

    updateDashboard(

        runs,

        stayWins,

        switchWins,

        stayPercent,

        switchPercent,

        seconds,

        speed

    );

}

/* -------------------------------
   UPDATE DASHBOARD
--------------------------------*/

function updateDashboard(

runs,

stayWins,

switchWins,

stayPercent,

switchPercent,

seconds,

speed

){

document.getElementById("runs").textContent=

runs.toLocaleString();

document.getElementById("stayWins").textContent=

stayWins.toLocaleString();

document.getElementById("switchWins").textContent=

switchWins.toLocaleString();

document.getElementById("stayPercent").textContent=

stayPercent+"%";

document.getElementById("switchPercent").textContent=

switchPercent+"%";

document.getElementById("time").textContent=

seconds.toFixed(6)+" sec";

document.getElementById("speed").textContent=

speed.toLocaleString()+" / sec";

/* Update Pie Chart */

pieChart.data.datasets[0].data=[

stayWins,

switchWins

];

pieChart.update();

/* Update Bar Chart */

barChart.data.datasets[0].data=[

stayWins,

switchWins

];

barChart.update();

}
document
.getElementById("playButton")
.addEventListener("click",playOneGame);

function playOneGame(){

const doors=[

document.getElementById("door1"),

document.getElementById("door2"),

document.getElementById("door3")

];

doors.forEach(d=>{

d.classList.remove("open");

d.classList.add("closed");

d.innerHTML="🚪";

});

const status=document.getElementById("gameStatus");

const car=Math.floor(Math.random()*3);

const player=Math.floor(Math.random()*3);

let goatDoor;

let remainingDoor;

status.textContent=
"Player chooses Door "+(player+1);

for(let i=0;i<3;i++){

if(i!==player && i!==car){

goatDoor=i;

}

}

for(let i=0;i<3;i++){

if(i!==player && i!==goatDoor){

remainingDoor=i;

}

}

setTimeout(()=>{

doors[goatDoor].classList.add("open");

doors[goatDoor].innerHTML="🐐";

status.textContent=
"Monty opens Door "+(goatDoor+1)+" showing a Goat.";

},1200);

setTimeout(()=>{

doors[car].classList.add("open");

doors[car].innerHTML="🚗";

if(player===car){

status.textContent=
"The player chose correctly. Staying wins.";

}

else{

status.textContent=
"The player chose a goat. Switching wins.";

}

},2600);

}