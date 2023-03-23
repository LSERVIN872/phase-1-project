const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);

const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");

const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

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
  


