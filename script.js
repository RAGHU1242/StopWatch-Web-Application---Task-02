let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const laps = document.getElementById("laps");
const lapContainer = document.getElementById("lap-container");

function startPause() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
        document.getElementById("start-pause").innerText = "Pause";
    } else {
        isRunning = false;
        clearInterval(intervalId);
        elapsedTime = Date.now() - startTime;
        document.getElementById("start-pause").innerText = "Start";
    }
}

function reset() {
    isRunning = false;
    clearInterval(intervalId);
    elapsedTime = 0;
    startTime = 0;
    hoursDisplay.innerText = "00";
    minutesDisplay.innerText = "00";
    secondsDisplay.innerText = "00";
    laps.innerHTML = "";
    lapContainer.style.display = "none"; // Hide the lap container when resetting
    document.getElementById("start-pause").innerText = "Start";
}

function lap() {
    if (isRunning) {
        const currentLapTime = `${hoursDisplay.innerText}:${minutesDisplay.innerText}:${secondsDisplay.innerText}`;
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${laps.children.length + 1}: ${currentLapTime}`;
        laps.appendChild(lapItem);

        // Show lap container when a lap is recorded
        lapContainer.style.display = "block";
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const { hours, minutes, seconds } = getTimeComponents(elapsedTime);
    hoursDisplay.innerText = hours;
    minutesDisplay.innerText = minutes;
    secondsDisplay.innerText = seconds;
}

function getTimeComponents(time) {
    const totalSeconds = Math.floor(time / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return { hours, minutes, seconds };
}

document.getElementById("start-pause").addEventListener("click", startPause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
