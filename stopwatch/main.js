const buttonStart = document.querySelector('.start');
const buttonPause = document.querySelector('.pause');
const buttonReset = document.querySelector('.reset');
const clock = document.querySelector('.clock');

const millisecOverSec = 1000;
const secOverMin = 60;
const minOverHr = 60;

let totalTimeElapsing = 0;
let startTime;
let startCounting;


buttonPause.disabled = true;
buttonReset.disabled = true;
clock.textContent = "00:00:00";



function displayTime() {
  const currentTime = Date.now();
  const singleTimeElapsing = currentTime - startTime + totalTimeElapsing;
  const time = {
    "hour": Math.floor(singleTimeElapsing / millisecOverSec / secOverMin / minOverHr) % 24,
    "minute": Math.floor(singleTimeElapsing / millisecOverSec / secOverMin) % 60,
    "second": Math.floor(singleTimeElapsing / millisecOverSec) % 60,
  };

  for(const unit in time) {
    if(time[unit] < 10) {
      time[unit] = `0${time[unit]}`;
    }
    else {
      time[unit] = String(time[unit]);
    }
  }

  
  clock.textContent =
  `${time["hour"]}:${time["minute"]}:${time["second"]}`;
}

buttonStart.addEventListener('click', (e) => {

  buttonStart.disabled = true;
  buttonPause.disabled = false;
  buttonReset.disabled = false;

  

  startTime = Date.now();

  displayTime()

  startCounting = setInterval(displayTime, 200);
});

buttonPause.addEventListener('click', (e) => {
  buttonStart.disabled = false;
  buttonPause.disabled = true;
  clearInterval(startCounting);
  totalTimeElapsing += Date.now() - startTime;
});

buttonReset.addEventListener('click', (e) => {

  clearInterval(startCounting);
  buttonStart.disabled = false;
  buttonPause.disabled = true;
  buttonReset.disabled = true;
  totalTimeElapsing = 0;
  clock.textContent = '00:00:00';
});