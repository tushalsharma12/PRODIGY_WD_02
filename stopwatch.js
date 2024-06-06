let minutesElement = document.getElementById("minutes");
let secondsElement = document.getElementById("seconds");
let millisecondsElement = document.getElementById("milliseconds");
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");
let lapButton = document.getElementById("lap");
let lapsList = document.getElementById("lapsList");

let startTime, intervalId, elapsedTime = 0, laps = [];

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateStopwatch, 10);
    startButton.disabled = true;
    stopButton.disabled = false;
    lapButton.disabled = false;
}

function stopStopwatch() {
    clearInterval(intervalId);
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
}

function resetStopwatch() {
  clearInterval(intervalId);
  elapsedTime = 0;
  minutesElement.textContent = "00";
  secondsElement.textContent = "00";
  millisecondsElement.textContent = "00";
  laps = [];
  lapsList.innerHTML = "";
  startButton.disabled = false;
  stopButton.disabled = true;
  lapButton.disabled = true;
}

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    millisecondsElement.textContent = padNumber(milliseconds, 2);
    secondsElement.textContent = padNumber(seconds, 2);
    minutesElement.textContent = padNumber(minutes, 2);
}

function padNumber(number, length) {
    let str = String(number);
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}

function recordLap() {
    let lapTime = elapsedTime;
    let milliseconds = Math.floor((lapTime % 1000) / 10);
    let seconds = Math.floor((lapTime / 1000) % 60);
    let minutes = Math.floor((lapTime / (1000 * 60)) % 60);

    let lapString = `Lap ${laps.length + 1}: ${padNumber(minutes, 2)}:${padNumber(seconds, 2)}:${padNumber(milliseconds, 2)}`;
    laps.push(lapString);

    let lapItem = document.createElement("li");
    lapItem.textContent = lapString;
    lapsList.appendChild(lapItem);
}

startButton.addEventListener("click", startStopwatch);
stopButton.addEventListener("click", stopStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);
