function runPowerSimulation() {

    const power = Number(document.getElementById("powerInput").value);

    if (isNaN(power) || power < 0) {
        alert("Enter a valid power.");
        return;
    }

    const runs = Math.pow(10, power);

    simulate(runs);

}

function runCustomSimulation() {

    const runs = Number(document.getElementById("customInput").value);

    if (isNaN(runs) || runs <= 0) {
        alert("Enter a valid number of simulations.");
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

    const stayPercent = (stayWins * 100 / runs).toFixed(4);

    const switchPercent = (switchWins * 100 / runs).toFixed(4);

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
        ((end - start) / 1000).toFixed(6) + " seconds";

}