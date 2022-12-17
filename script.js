'use strict'

const game = (() => {
  const tiles = [];
  const players = [];
  const board = document.querySelector('.board');
  const results = document.querySelector('.game-results');
  const createBoard = function() {
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        const div = document.createElement('div');
        div.classList.add('tile');
        div.dataset.yIndex = i;
        div.dataset.xIndex = j;
        div.addEventListener('click', takeTurn);
        board.appendChild(div);
        tiles[i, j] = div;
      }
    }
  }

  let count = 0;
  const takeTurn = function() {
    count++
    this.textContent = players.find(player => player.turn === true).char;
    changeTurn();
    this.removeEventListener('click', takeTurn);
    checkWin(count);
    return count;
  }

  const changeTurn = function() {
    players.forEach(player => {
      player.turn === true ? player.turn = false : player.turn = true;
    });
  }
  
  const checkWin = function(count) {
    if (tiles[0].textContent === tiles[1].textContent &&
       tiles[1].textContent === tiles[2].textContent) {
      console.log('win');
    } else if (count === 9) {
      results.textContent = 'Draw';
    }
  }

  const player = (name, turn, char) => {
    return { name, turn, char }
  }

  const playerVsPlayer = (name1, name2) => {
    players.push(player(name1, true, 'X'));
    players.push(player(name2, false, 'O'));
  }

  return {
    tiles,
    createBoard,
    takeTurn,
    player,
    playerVsPlayer
  }

})();



game.createBoard();
game.playerVsPlayer('Player 1', 'Player 2');