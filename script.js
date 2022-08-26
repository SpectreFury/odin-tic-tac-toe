const gameBoard = (function () {
  const board = [];

  return {
    board,
  };
})();

const gameLoop = (function () {
  const playerOne = playerFactory("X");
  const playerTwo = playerFactory("O");
})();

function playerFactory(mark) {
  return {
    mark,
  };
}
