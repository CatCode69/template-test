const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("li span");

const completeEl = document.getElementById("complete");
const completeInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

// Adding min to date element
const today = new Date().toISOString().substring(0, 10);
dateEl.setAttribute("min", today);

let countdownTitle, countdownDate, countdownInterval;

// Local Storage Check
if (localStorage.getItem("countdown")) {
  const countdown = JSON.parse(localStorage.getItem("countdown"));
  countdownTitle = countdown.countdownTitle;
  countdownDate = countdown.countdownDate;
  updateDOM();
}

function timeDistanceCalc(countdownDate) {
  const now = new Date().getTime();
  countdownDate = new Date(countdownDate).getTime();
  const distance = countdownDate - now;

  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  const days = Math.floor(distance / day)
    .toString()
    .padStart(2, 0);
  const hours = Math.floor((distance % day) / hour)
    .toString()
    .padStart(2, 0);
  const minutes = Math.floor((distance % hour) / minute)
    .toString()
    .padStart(2, 0);
  const seconds = Math.floor((distance % minute) / second)
    .toString()
    .padStart(2, 0);

  return {
    days,
    hours,
    minutes,
    seconds,
    distance,
  };
}

function updateDOM() {
  countdownIntervalFn = () => {
    const distance = timeDistanceCalc(countdownDate);
    countdownElTitle.textContent = countdownTitle;
    inputContainer.hidden = true;

    if (distance.distance < 0) {
      completeInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
      clearInterval(countdownInterval);
      countdownEl.hidden = true;
      completeEl.hidden = false;
    } else {
      timeElements[0].textContent = distance.days;
      timeElements[1].textContent = distance.hours;
      timeElements[2].textContent = distance.minutes;
      timeElements[3].textContent = distance.seconds;

      countdownEl.hidden = false;
    }
  };
  countdownIntervalFn();

  countdownInterval = setInterval(countdownIntervalFn, 1000);
}

// Getting Input Data from Form
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.target.title.value;
  countdownDate = e.target.date.value;
  localStorage.setItem(
    "countdown",
    JSON.stringify({ countdownTitle, countdownDate })
  );
  if (!countdownTitle || !countdownDate) {
    alert("Please make sure to fill the inputs.");
  } else {
    updateDOM();
  }
}

function countdownReset() {
  clearInterval(countdownInterval);
  countdownTitle = countdownDate = "";
  completeEl.hidden = true;
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  countdownForm.reset();
  localStorage.clear();
}

// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", countdownReset);
completeBtn.addEventListener("click", countdownReset);
