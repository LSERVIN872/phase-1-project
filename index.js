const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const playerForm = document.querySelector('.playercard')

function getPlayer1() {
  return fetch('http://localhost:3000/players')
  .then(res => res.json())
    .then(data => document.getElementById('player1').src = data[0].image)
    .then(data => document.getElementById('player2').src = data[1].image)
    .then(data => document.getElementById('player3').src = data[2].image)
    .then(data => document.getElementById('player4').src = data[3].image)
    .then(data => document.getElementById('player5').src = data[4].image)

}

getPlayer1()


//score board
let score = 0,
    display = document.getElementById('num');

let plus = document.getElementById('plus'),
    minus = document.getElementById('minus'),
    player1 = document.getElementById('player1');
    player2 = document.getElementById('player2');

display.innerText = score;

plus.addEventListener('click', function(){
  score++;
  display.innerText = score;
  enabled();
});

minus.addEventListener('click', function(){
  score--;
  display.innerText = score;
});

function check() {
  if(score <= 1) {
    score = 1;
    display.innerText = score;
    disabled();
  };
};

function disabled() {
  minus.disabled = true;
};

function enabled() {
  minus.disabled = false;
};
//Score Board end

const boardState = Array(tiles.length);
boardState.fill(null);

const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");

const playAgain = document.getElementById("Down-arrow-to-play-again");
playAgain.addEventListener("keydown", startNewGame);

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText() {
    tiles.forEach((tile) => {
      tile.classList.remove("x-hover");
      tile.classList.remove("o-hover");
    });
    const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

setHoverText();

function tileClick(event) {
    if (gameOverArea.classList.contains("visible")) {
      return;
    }
    const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }
  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    boardState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    boardState[tileNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }
  setHoverText();
  checkWinner();
}
function checkWinner() {
    
    for (const winningCombination of winningCombinations) {
    
      const { combo, strikeClass } = winningCombination;
      const tileValue1 = boardState[combo[0] - 1];
      const tileValue2 = boardState[combo[1] - 1];
      const tileValue3 = boardState[combo[2] - 1];
  
      if (
        tileValue1 != null &&
        tileValue1 === tileValue2 &&
        tileValue1 === tileValue3
      ) {
        strike.classList.add(strikeClass);
        gameOverScreen(tileValue1);
        return;
      }
    }
    const allTileFilledIn = boardState.every((tile) => tile !== null);
    if (allTileFilledIn) {
      gameOverScreen(null);
    }
  }
  
  function gameOverScreen(winnerText) {
    let text = "Draw!";
    if (winnerText != null) {
      text = `Winner is ${winnerText}!`;
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
  
  }
  
  function startNewGame() {
    strike.className = "strike";
    gameOverArea.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = PLAYER_X;
    setHoverText();
  }
  
  const winningCombinations = [
  
    { combo: [1, 2, 3], strikeClass: "strike-row-1" },
    { combo: [4, 5, 6], strikeClass: "strike-row-2" },
    { combo: [7, 8, 9], strikeClass: "strike-row-3" },
    
    { combo: [1, 4, 7], strikeClass: "strike-column-1" },
    { combo: [2, 5, 8], strikeClass: "strike-column-2" },
    { combo: [3, 6, 9], strikeClass: "strike-column-3" },
    
    { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
    { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },]
  
