/*  let seconds = 0;
let minutes = 0;
let hours = 0;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

let interval;
let status = "stopped";

const display = document.querySelector(".display");
const tumbler = document.querySelector(".startStop");
const tumblerReset = document.querySelector(".reset");

function stopWatch () {
    seconds++;
    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++

        if (minutes / 60 === 1) {
            minutes = 0;
            hours++
        }
    }
    
    displaySeconds = (seconds < 10) ? "0" + seconds : seconds;
    displayMinutes = (minutes < 10) ? "0" + minutes : minutes;
    displayHours = (hours < 10) ? "0" + hours : hours;
    
    display.innerHTML = 
    `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

function startStop () {
    if(status === "stopped") {
        interval = setInterval(stopWatch, 1000);
        tumbler.innerHTML = "Stop"
        status = "started";
    }
    else {
        clearInterval(interval);
        tumbler.innerHTML = "Start";
        status = "stopped";
    }
}

function reset () {
    clearInterval(interval);
    seconds = minutes = hours = 0;
    display.innerHTML = "00:00:00";
    tumbler.innerHTML = "Start";
    status = "stopped";
}

tumbler.addEventListener('click', startStop);
tumblerReset.addEventListener('click', reset); */ 
/* Всё конечно хорошо, но при паузе не запоминает милисекунды и интервал идёт с нуля, в итоге если нажимать без остановки на "старт" и на "стоп", секунды не идут.
Зато не замедляется )) 
 */

const startTimerButton = document.querySelector(".startStop");
const pauseTimerButton = document.querySelector(".reset");
const timerDisplay = document.querySelector(".display");

let startTime;
let updateTime;
let difference;
let timeInterval;
let savedTime;
let paused = 0;
let running = 0;

function startTimer() {
    if (running == 0) {
        startTime = new Date().getTime();
        timeInterval = setInterval(getShowTime, 1);
        paused = 0;
        running = 1;
        startTimerButton.innerHTML = "Pause";
    } else pauseTimer();
}

function pauseTimer () {
    if (difference == 0) {

    } else if (paused == 0) {
        clearInterval(timeInterval);
        savedTime = difference;
        paused = 1;
        running = 0;
        startTimerButton.innerHTML = "Start"
    } else {
        startTimer();
    }
}

function resetTimer () {
    clearInterval(timeInterval);
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;
    timerDisplay.innerHTML = "00:00:00";
    startTimerButton.innerHTML = "Start";
}

function getShowTime () {
    updateTime = new Date().getTime();
    if (savedTime) {
        difference = (updateTime - startTime) + savedTime;
    } else {
        difference = updateTime - startTime;
    }
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
} 

startTimerButton.addEventListener('click', startTimer);

pauseTimerButton.addEventListener('click', resetTimer);

