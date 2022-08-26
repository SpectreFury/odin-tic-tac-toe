const cells = document.querySelectorAll(".cell"); // Two function seems to use it so it better be global.
const restartBtn = document.querySelector(".btn-restart");
const gameOverText = document.querySelector(".text-gameover");
const modal = document.querySelector(".modal");

const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  function printBoard() {
    cells.forEach((cell, i) => {
      cell.textContent = board[i];
    });
  }
  const gameOverConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function gameOverCheck() {
    if (
      board[0] === board[1] &&
      board[1] === board[2] &&
      board[0] !== "" &&
      board[1] !== "" &&
      board[2] !== ""
    ) {
      return true;
    } else if (
      board[3] === board[4] &&
      board[4] === board[5] &&
      board[3] !== "" &&
      board[4] !== "" &&
      board[5] !== ""
    ) {
      return true;
    } else if (
      board[6] === board[7] &&
      board[7] === board[8] &&
      board[6] !== "" &&
      board[7] !== "" &&
      board[8] !== ""
    ) {
      return true;
    } else if (
      board[0] === board[3] &&
      board[3] === board[6] &&
      board[0] !== "" &&
      board[3] !== "" &&
      board[6] !== ""
    ) {
      return true;
    } else if (
      board[1] === board[4] &&
      board[4] === board[7] &&
      board[1] !== "" &&
      board[4] !== "" &&
      board[7] !== ""
    ) {
      return true;
    } else if (
      board[2] === board[5] &&
      board[5] === board[8] &&
      board[2] !== "" &&
      board[5] !== "" &&
      board[8] !== ""
    ) {
      return true;
    } else if (
      board[0] === board[4] &&
      board[4] === board[8] &&
      board[0] !== "" &&
      board[4] !== "" &&
      board[8] !== ""
    ) {
      return true;
    } else if (
      board[2] === board[4] &&
      board[4] === board[6] &&
      board[2] !== "" &&
      board[4] !== "" &&
      board[6] !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  function addMarkToArray(location, mark) {
    if (location.classList.contains("top-left")) {
      board[0] = mark;
    } else if (location.classList.contains("top-middle")) {
      board[1] = mark;
    } else if (location.classList.contains("top-right")) {
      board[2] = mark;
    } else if (location.classList.contains("middle-left")) {
      board[3] = mark;
    } else if (location.classList.contains("middle")) {
      board[4] = mark;
    } else if (location.classList.contains("middle-right")) {
      board[5] = mark;
    } else if (location.classList.contains("bottom-left")) {
      board[6] = mark;
    } else if (location.classList.contains("bottom-middle")) {
      board[7] = mark;
    } else if (location.classList.contains("bottom-right")) {
      board[8] = mark;
    } else {
    }
  }

  return {
    board,
    printBoard,
    addMarkToArray,
    gameOverCheck,
    gameOverConditions,
    resetBoard,
  };
})();

const gameLoop = (function () {
  const playerOne = playerFactory("X");
  const playerTwo = playerFactory("O");
  let counter = 0;

  restartBtn.addEventListener("click", () => {
    counter = 0;
    gameBoard.resetBoard();
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    removeModal();
  });

  function placeMarkAndInvertTurn(currentPlayer, otherPlayer, e) {
    currentPlayer.placeMark(e);
    currentPlayer.hasTurn = !currentPlayer.hasTurn;
    otherPlayer.hasTurn = !otherPlayer.hasTurn;
  }

  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (e.target.textContent) {
        return;
      }
      counter++;
      if (playerOne.hasTurn) {
        placeMarkAndInvertTurn(playerOne, playerTwo, e);
        const mark = playerOne.mark;
        const location = e.target;
        gameBoard.addMarkToArray(location, mark);
      } else {
        placeMarkAndInvertTurn(playerTwo, playerOne, e);
        const mark = playerTwo.mark;
        const location = e.target;
        gameBoard.addMarkToArray(location, mark);
      }

      // Game Over Check
      if (gameBoard.gameOverCheck()) {
        gameOverText.textContent = "You won!";
        showModal();
      } else if (!gameBoard.gameOverCheck() && counter === 9) {
        gameOverText.textContent = "It's a draw!";
        showModal();
      } else {
        return;
      }
    });
  });
})();

function playerFactory(mark) {
  let hasTurn = true;

  function placeMark(e) {
    e.target.textContent = mark;
    hasTurn = !hasTurn;
  }

  return {
    mark,
    placeMark,
    hasTurn,
  };
}

function showModal() {
  modal.classList.add("visible");
}

function removeModal() {
  modal.classList.remove("visible");
}
