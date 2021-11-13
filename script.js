const gameContainer = document.getElementById("game");
let score = 0;
let clickedCard = [];
let clickOption = false;
let matches = 0;
const startButton = document.getElementById("start");
let buttonBox = document.getElementById('buttons');
let scoreBox = document.getElementsByClassName('score');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

//shuffle colors
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);
//create new divs with class set to the same color
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = 'white';
    newDiv.addEventListener("click", handleCardClick);
    newDiv.addEventListener("click", openCard);
    gameContainer.append(newDiv);
  }
}
//what happens when you click on the card
function handleCardClick(event) {
  if (clickOption) return;
  if (event.target.classList.contains('active')) return;

  const color = event.target.classList[0];
  const card = event.target;
  card.style.backgroundColor = color;

  clickedCard.push(this);
  for (let i = 0; i < clickedCard.length; i++) {
    clickedCard[i].classList.add('active');
  }
  if (clickedCard[0] && clickedCard[1]) {
    clickOption = true;
  }
}

// limit two cards and delegate match vs unmatched
function openCard(e) {
  let card1 = clickedCard[0];
  let card2 = clickedCard[1];
  const color = e.target.classList[0];
  let two = clickedCard.length;

  if (two === 2) {
    if (clickedCard[0].classList[0] === clickedCard[1].classList[0]) {
      score++;
      scoreBox.innerText = `Score = ${score}`;
      matches += 2;
      clickOption = false;
      clickedCard = [];
      // console.log(matches, score)
    } else {
      setTimeout(function () {
        score--;
        scoreBox.innerText = `Score = ${score}`;
        card1.style.backgroundColor = "white";
        card2.style.backgroundColor = "white";
        clickedCard[0].classList.remove('active');
        clickedCard[1].classList.remove('active');
        clickedCard = [];
        clickOption = false;
      }, 1000)    
    }
  } if (matches === COLORS.length) {
    if (!localStorage.highScore) {
      localStorage.highScore = score;
    } else if (score > localStorage.highScore) {
      localStorage.highScore = score;
    }
    alert(`You won! Your score was ${score}.
      Score to beat is ${localStorage.highScore}`);
     //Add Restart Button
    restartForm = document.createElement('form');
    restartButton = document.createElement('button');
    restartButton.innerText = 'Restart';
    restartButton.classList.add("restart");
    buttonBox.appendChild(restartForm);
    restartForm.appendChild(restartButton);
    restartButton.addEventListener('click', restart)
    // Reset High Score
    resetButton = document.createElement('button');
    resetButton.innerText = 'Reset High Score';
    resetButton.classList.add('reset');
    buttonBox.appendChild(resetButton);
    resetButton.addEventListener('click', function(e) {
      localStorage.removeItem('highScore');
    })
    }
}

// Score element   try and include localStorage here so they can see the best score vs their score

// Start Button
startButton.addEventListener('click', startGame);
function startGame() {
  // Build Board
  createDivsForColors(shuffledColors);
  //Disable Start Button
  startButton.removeEventListener('click', startGame);
  startButton.addEventListener('click', function() {
    alert('Game has begun! Start clicking cards and look for matches.');
  });
  //Add Score Box
  scoreBox = document.createElement('span');
  scoreBox.classList.add('score');
  scoreBox.innerText = 'Score = 0';
  buttonBox.appendChild(scoreBox);
}
//restart button
function restart(e) {
  scoreBox.innerText = 'Score = 0';
  score = 0;
  matches = 0;
}