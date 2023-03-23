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

