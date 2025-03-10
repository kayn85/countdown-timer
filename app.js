const timer = document.getElementById("timer")
const minInput = document.getElementById("min-input")
const startButton = document.querySelector('form button[type="submit"]')
const stopButton = document.getElementById("stop-btn")
const resetButton = document.getElementById("reset-btn")

let countdown;
let remainingSeconds = 0
let isPaused = false
stopButton.disabled = true

// för att lägga till "0" framför siffror som är mindre än 10. tex 09:05
const formatTime = time => {
  return time < 10 ? `0${time}` : time
}

function startCount() {
  // stänga av startknappen när timer kör.
  startButton.disabled = true
  // kör en hel ny om vi inte resume
  if (!isPaused) {
    const minutes = parseInt(minInput.value)
    if (isNaN(minutes) || minutes < 1 || minutes > 60) {
      alert("Please enter a valid number between 1 and 60.")
      startButton.disabled = false
      return
    }
    remainingSeconds = minutes * 60
  }

  isPaused = false
  // byt stop button utseende när man klicka
  stopButton.textContent = "Stop"
  stopButton.classList.remove("btn-success")
  stopButton.classList.add("btn-danger")

  countdown = setInterval(() => {
    remainingSeconds--
    minInput.disabled = true
    stopButton.disabled = false
    const formattedMinutes = formatTime(Math.floor(remainingSeconds / 60))
    const formattedSeconds = formatTime(remainingSeconds % 60)
    timer.textContent = `${formattedMinutes}:${formattedSeconds}`
    if (remainingSeconds === 0) {
      clearInterval(countdown)
      alert("Time is up!")
      timer.textContent = '00:00'
      minInput.value = ""
      isPaused = false
      minInput.disabled = false
      startButton.disabled = false
      stopButton.disabled = true
      stopButton.textContent = "Stop"
      stopButton.classList.remove("btn-success")
      stopButton.classList.add("btn-danger")
    }
  }, 1000)
}

function stopResumeCount() {
  if (!isPaused) {
    // om den kör. stoppa timer
    clearInterval(countdown)
    isPaused = true
    // byt från stop till resume + grön färg
    stopButton.textContent = "Resume"
    stopButton.classList.remove("btn-danger")
    stopButton.classList.add("btn-success")
  }
  else {
    startCount()
  }
}

function resetCount() {
  clearInterval(countdown)
  timer.textContent = '00:00'
  minInput.value = 0
  remainingSeconds = 0
  isPaused = false
  startButton.disabled = false
  minInput.disabled = false
  stopButton.disabled = true

  // återställa stop knappen till stop
  stopButton.textContent = "Stop"
  stopButton.classList.remove("btn-success")
  stopButton.classList.add("btn-danger")
}

startButton.addEventListener("click", event => {
  event.preventDefault()
  startCount()
})

stopButton.addEventListener("click", stopResumeCount)
resetButton.addEventListener("click", resetCount)