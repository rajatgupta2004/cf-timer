
let timerButton;
var rj =0;

// localStorage.setItem('isClicked', false);
let timerDisplay;

function createTimerDisplay() {
  timerDisplay = document.createElement('div');
  timerDisplay.style.position = 'fixed';
  timerDisplay.style.bottom = '20px';
  timerDisplay.style.right = '20px';
  timerDisplay.style.backgroundColor = '#fff';
  timerDisplay.style.padding = '5px';
  timerDisplay.style.border = '5px solid #ccc';
  timerDisplay.style.zIndex = '9999';
  document.body.appendChild(timerDisplay);
  
  return timerDisplay;
}

function acceptedbox(){
    let acc1 = document.createElement('div');
    acc1.innerText = 'already accepted';
    acc1.style.position = 'relative';
    acc1.style.backgroundColor = 'green';
    acc1.style.padding = '5px';
    acc1.style.border = '5px solid #ccc';
    acc1.style.zIndex = '9999';
    return acc1;
}

function createTimerButton() {

  
  const verdictAccepted = document.querySelectorAll('.verdict-accepted');
  if (verdictAccepted.length > 0) {
    let acc = acceptedbox();
    const ps = document.querySelector('.title');
    if (ps) {
      ps.insertAdjacentElement('afterend', acc);
    }
    // clearInterval(timerInterval);
    // localStorage.removeItem('elapsedTime');
    localStorage.removeItem('isClicked');
    return;
  }


let stopbutton = document.createElement('button');
stopbutton.innerText='STOP timer';
stopbutton.style.position = 'relative';
stopbutton.style.zIndex ='9999';

let timerButton = document.createElement('button');
timerButton.innerText = 'Start Timer';
timerButton.style.position = 'relative';
timerButton.style.zIndex = '9999';
 
const problemStatement = document.querySelector('.title');
if (problemStatement) {
  problemStatement.insertAdjacentElement('afterend', stopbutton);
  problemStatement.insertAdjacentHTML('afterend', '   ');
  problemStatement.insertAdjacentElement('afterend', timerButton);
}
stopbutton.addEventListener('click', tmp2);

function tmp2(){
  clearInterval(timerInterval);
  localStorage.removeItem('elapsedTime');
  localStorage.removeItem('isClicked');

}
  timerButton.addEventListener('click', tmp);
  function tmp(){
    localStorage.setItem('isClicked', true);
    rj=1;
    startTimer();
  }

}


let timerInterval;

function startTimer() {
  if (timerInterval) {
    return;
  }
  let startTime = Date.now();
  const timerDisplay = createTimerDisplay();
  function updateTimer() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    let formattedTime = `${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    timerDisplay.innerText = `Time elapsed: ${formattedTime}`;
    var timef = `Time elapsed: ${formattedTime}`;
    localStorage.setItem('elapsedTime', currentTime);
    localStorage.setItem('timerRunning', true);
// to check if there is any ac then sbb time smapt krdo
    const verdictAccepted = document.querySelectorAll('.verdict-accepted');
    if (verdictAccepted.length > 0) {
      clearInterval(timerInterval);
      timerDisplay.style.backgroundColor ='yellow';
      timerDisplay.innerText = timef;
      localStorage.removeItem('elapsedTime');
    }
  }

  const storedTime = localStorage.getItem('elapsedTime');
  
  if (storedTime) {
    startTime = Date.now() - storedTime * 1000;
    updateTimer();
  }

  timerInterval = setInterval(updateTimer, 1000);
  localStorage.setItem('timerInterval', timerInterval);
}

// timer screen will not affect by reloading
const cond = localStorage.getItem('isClicked');
if (cond) {
  startTimer();
}
createTimerButton();


//timer stop krney ke liye
window.addEventListener('unload', () => {
  const timerInterval = localStorage.getItem('timerInterval');
  clearInterval(timerInterval);
});


