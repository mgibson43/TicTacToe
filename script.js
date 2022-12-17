'use strict'

const game = (() => {
  const tiles = [];
  const players = [];
  const winCases = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
  ];
  const board = document.querySelector('.board');
  const results = document.querySelector('.game-results');
  const createBoard = function() {
    for (let i = 0; i < 9; i++) {
      const div = document.createElement('div');
      div.classList.add('tile');
      div.addEventListener('click', takeTurn);
      board.appendChild(div);
      tiles.push(div);
    }
  }

  let count = 0;
  const takeTurn = function() {
    count++
    this.textContent = players.find(player => player.turn === true).char;
    this.removeEventListener('click', takeTurn);
    const status = checkWin(count);
    console.log(status);
    changeTurn();
  }

  const changeTurn = function() {
    players.forEach(player => {
      player.turn === true ? player.turn = false : player.turn = true;
    });
  }
  
  const checkWin = function(count) {
    let status = '';
    winCases.forEach(condition => {
      const one = tiles[condition[0]].textContent;
      const two = tiles[condition[1]].textContent;
      const three = tiles[condition[2]].textContent;

      if (one != '' && one === two && two === three) status = 'win';
    });
    if (status === '') {
      count === 9 ? status = 'Draw' : status = 'Pending';
    } 
    return status;
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