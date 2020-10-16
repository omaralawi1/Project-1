const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const timeLeft = document.querySelector('#time-left')
const rowClasses = ['grass', 'grass', 'water', 'water', 'grass', 'road', 'road', 'grass', 'grass']

function sendAlert(msg){
  setTimeout(function(){
    alert(msg) 
    location.reload()
  }, 100)
}

function removeFrog(){
  var frogPlace = document.querySelector(`#cell_${frogRow}_${frogColumn}`)
  frogPlace.classList.remove('frog')
}

function addFrog(){
  var frogPlace = document.querySelector(`#cell_${frogRow}_${frogColumn}`)
  frogPlace.classList.add('frog')
  checkFrog()
  if (frogRow === 0){
    sendAlert('Winner Winner Frogger Dinner!')
  }
}

function checkFrog(){
  var frogPlace = document.querySelector(`#cell_${frogRow}_${frogColumn}`)
  if(frogPlace.classList.contains('cars')){
    clearInterval(leftId)
    clearInterval(rightId)
    sendAlert('Were you not taught to look both ways? Game over!')
  }

  else if (!frogPlace.classList.contains('logs') && frogPlace.classList.contains('water')){
    clearInterval(leftId)
    clearInterval(rightId)
    sendAlert('Buy some arm bands next time! Game over!')
  }
}

function addCar(row, column){
  var frogPlace = document.querySelector(`#cell_${row}_${(9+column)%9}`)
  frogPlace.classList.add('cars')
}

function removeCar(row, column){
  var frogPlace = document.querySelector(`#cell_${row}_${(9+column)%9}`)
  frogPlace.classList.remove('cars')
}

function addLog(row, column){
  for(var i=0; i<5; i++){
    var frogPlace = document.querySelector(`#cell_${row}_${(9+column+i)%9}`)
    frogPlace.classList.add('logs')
  }
}

function removeLog(row, column){
  for(var i=0;i<5;i++){
    var frogPlace = document.querySelector(`#cell_${row}_${(9+column+i)%9}`)
    frogPlace.classList.remove('logs')
  }
}

function removeCarsLeft(){
  for(var i = 1;i<9;i+=3){
    removeCar(5, i + leftTimeStep)
  }
}
function removeCarsRight(){
  for(var i = 2;i<9;i+=3){
    removeCar(6, i - rightTimeStep)
  }
}
  
function addCarsLeft(){
  for(var i = 1;i<9;i+=3){
    addCar(5, i + leftTimeStep)
  }
}
function addCarsRight(){
  for(var i = 2;i<9;i+=3){
    addCar(6, i - rightTimeStep)
  }
}

function updateLeft(){
  if(playing){
    removeCarsLeft()
    removeLog(2, 1 + leftTimeStep)
    leftTimeStep = (leftTimeStep+1)%9
    addCarsLeft()
    addLog(2, 1 + leftTimeStep)
    if (frogRow ===2){
      removeFrog()
      frogColumn = (frogColumn + 1) % 9
      addFrog()
    }
    checkFrog()
  }
}

function updateRight(){
  if(playing){
    removeCarsRight()
    removeLog(3, 3 - rightTimeStep)
    rightTimeStep = (rightTimeStep+1)%9
    addCarsRight()
    addLog(3, 3 - rightTimeStep)
    if (frogRow ===3){
      removeFrog()
      frogColumn = (frogColumn + 8) % 9
      addFrog()
    }
    checkFrog()
  }
}

function countDown() {
  if(playing){
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime === 0) {
      clearInterval(timerId)
      sendAlert('TOO SLOW. GAME OVER!')
    }
  }
}

function start(){
  playing = !playing
}

function showGrid(){
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9;j++){
      grid.innerHTML += `<div class='${rowClasses[i]}' id='cell_${i}_${j}'></div>`
    } 
  }
}

function keyboard(){
  document.addEventListener('keypress', (event) => {
    if(playing){
      switch (event.key) {
        // Up
        case 'w': {
          if (frogRow <= 0) {
            return
          }
          removeFrog()
          frogRow --
          addFrog()
          break
        }
        // Down
        case 's': {
          if (frogRow >= 8) {
            return
          }
          removeFrog()
          frogRow ++
          addFrog()
          break
        }
        // Left
        case 'a': {
          
          if (frogColumn <= 0) {
            return
          }
          removeFrog()
          frogColumn --
          addFrog()
          break
        }
        // Right
        case 'd': {
          
          if (frogColumn >= 8) {
            return
          }
          removeFrog()
          frogColumn ++
          addFrog()
          break
        }
      }
    }
  })
}

let currentTime = timeLeft.textContent
var frogRow = 8
var frogColumn = 4
var leftTimeStep = 0
var rightTimeStep = 0
var playing = false

showGrid()
addFrog()
addCarsLeft()
addCarsRight()
addLog(2,1)
addLog(3,3)
keyboard()

timerId = setInterval(countDown, 1000)
leftId = setInterval(updateLeft, 1000)
rightId = setInterval(updateRight, 500)
