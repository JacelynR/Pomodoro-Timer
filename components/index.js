//default values
let sessionLength = (25 * 60);
let breakLength = (5 * 60);
let timeLeft = (25 * 60);
let timerOn = false;
let isCountingDown = true;
//display 
let breakDisplay = document.getElementById("break-length");
let sessionDisplay = document.getElementById("session-length");
let intervalType = document.getElementById("timer-label");
let timeLeftDisplay = document.getElementById("time-left");
let buzzerSound = document.getElementById("beep");

// FUNCTIONS
// increase break by 1
function incrementBreak() {
    if (breakLength < (60 * 60)) {
        breakLength += 60;
        //format time amount for display
        let convertedBreak = changeToMinutes(breakLength);
        //console.log(convertedBreak);
        breakDisplay.textContent = convertedBreak;
    }
};

// decrease break by 1
function decrementBreak() {
    if (breakLength > 60){
        breakLength -= 60;
        //format time amount for display
        let convertedBreak = changeToMinutes(breakLength);
        breakDisplay.textContent = convertedBreak;
    }
};

// increase session by 1
function incrementSession() {
    if (sessionLength < (60 * 60)){
        sessionLength += 60;
        //format time amount for display
        let convertedSession = changeToMinutes(sessionLength);
        let newTime = formatTime(sessionLength);
        
        timeLeft = sessionLength;
        //display formatted time
        sessionDisplay.textContent = convertedSession;
        timeLeftDisplay.textContent = newTime;
        //console.log(newTime);
    }
}

// decrease session by 1
function decrementSession() {
    if (sessionLength > 60){
        sessionLength -= 60;
        //format time amount for display
        let convertedSession = changeToMinutes(sessionLength);
        let newTime = formatTime(sessionLength);

        timeLeft = sessionLength;
        sessionDisplay.textContent = convertedSession;
        timeLeftDisplay.textContent = newTime;
        //console.log(newTime);
    }
}

//change seconds to minutes from break/session inputs
function changeToMinutes(time) {
    let minutes = Math.floor(time/60);
    let _minutes = minutes.toString();
    return _minutes;
}

//Play and Pause Timer
function PlayPauseTimer() {
    let timerRunning = isTimerOn(timerOn);
    timerOn = timerRunning;

    if (timerOn === true){
        startTimer();
    } else {
        stopTimer();
    }
}

let counter;  //counter for timer countdown
function startTimer() {
    timeLeftDisplay.textContent = formatTime(timeLeft);
    //evaluates timerUpdate function every 1 second
    counter = setInterval(timerUpdate, 1000);
}

function timerUpdate() {
    timeLeft -= 1; //decrement timer by 1
    timeLeftDisplay.textContent = formatTime(timeLeft);
    //console.log(timeLeft);

    //timer shows 60 seconds or less
    if (timeLeft < 60){
        timeLeftDisplay.style.color = "#9c0606";
        intervalType.style.color = "#9c0606";
    }
    //Play alarm sound when timer gets to 00:00
    if (timeLeft === 0){
        buzzerSound.currentTime = 0;
        buzzerSound.play();
    }
    // Change interval type from Session to Break and vice versa
    // and timer starts counting down on new interval type
    if (timeLeft < 0){
        stopTimer();

        if (isCountingDown === true){
            //break interval
            intervalType.textContent = "Break Interval";
            timeLeft = breakLength;
            isCountingDown = false;
            timeLeftDisplay.style.color = "#000";
            intervalType.style.color = "#000";
        }
        else {
            //session interval
            intervalType.textContent = "Session Interval";
            timeLeft = sessionLength;
            timeLeftDisplay.textContent = formatTime(timeLeft);
            isCountingDown = true;
            timeLeftDisplay.style.color = "#000";
            intervalType.style.color = "#000";
        }
        startTimer();
    }
};

//stops time at the current interval on timer
function stopTimer() {
    clearInterval(counter);
};

// set timer on or off
function isTimerOn(timerOn) {
    let setTimerOn = null;

    if (timerOn === false){
        setTimerOn = true;
       // console.log("timer is on");
        return setTimerOn;
    } else {
        setTimerOn = false;
        //console.log("timer is off");
        return setTimerOn;
    }
};

function resetTimer() {  
    //stop at current time
    stopTimer();
    //default values
    breakLength = (5 * 60);
    sessionLength = (25 * 60);
    timeLeft = (25 * 60);
    timerOn = false;
    isCountingDown = true;
    //reset interval label
    intervalType.textContent = "Session Interval";
    timeLeftDisplay.style.color = "black";
    intervalType.style.color = "black";
    //reset sound
    buzzerSound.pause();
    buzzerSound.currentTime = 0;
    //show the default values
    timeLeftDisplay.textContent = formatTime(sessionLength);
    breakDisplay.textContent = changeToMinutes(breakLength);
    sessionDisplay.textContent = changeToMinutes(sessionLength);
};

//format time as 00:00
const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (
        (minutes < 10 ? "0" + minutes : minutes ) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)
    );
};