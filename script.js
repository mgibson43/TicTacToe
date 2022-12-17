'use strict'

const tictactoe = document.querySelector('.game');
const tictactoeMenu = document.querySelector('.menu');

const game = (() => {
  let count = 0;
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
  const title = document.querySelector('.title');
  const restart = document.querySelector('.restart-btn');
  const pvp = document.querySelector('.pvp-btn');
  const menuBtn = document.querySelector('.menu-btn');

  restart.addEventListener('click', function() {
    clearBoard();
    createBoard()
    playerVsPlayer();
  });

  pvp.addEventListener('click', function() {
    createBoard();
    playerVsPlayer('Player 1', 'Player 2');
    tictactoeMenu.classList.add('hidden');
    tictactoe.classList.remove('hidden');
  });

  menuBtn.addEventListener('click', function() {
    clearBoard();
    tictactoe.classList.add('hidden');
    tictactoeMenu.classList.remove('hidden');
  });
  

  const createBoard = function() {
    for (let i = 0; i < 9; i++) {
      const div = document.createElement('div');
      div.classList.add('tile');
      div.addEventListener('click', takeTurn);
      board.appendChild(div);
      tiles.push(div);
    }
  }

  const takeTurn = function() {
    count++;
    this.textContent = players.find(player => player.turn === true).char;
    this.removeEventListener('click', takeTurn);
    const status = checkWin(count);
    if (status === 'win' || status === 'draw') endGame(status);
    changeTurn();
  }

  const changeTurn = function() {
    players.forEach(player => {
      player.turn === true ? player.turn = false : player.turn = true;
    });
  }
  
  const checkWin = function(count) {
    let status = '';
    if (count < 3) return status = 'pending'; 
    winCases.forEach(condition => {
      const one = tiles[condition[0]].textContent;
      const two = tiles[condition[1]].textContent;
      const three = tiles[condition[2]].textContent;

      if (one != '' && one === two && two === three) status = 'win';
    });
    if (status === '') {
      count === 9 ? status = 'draw' : status = 'pending';
    } 
    return status;
  }

  const endGame = function(status) {
    status === 'win' ? results.textContent = `${players.find(player => player.turn === true).name} wins!` : results.textContent = 'Draw';
    tiles.forEach(tile => tile.removeEventListener('click', takeTurn));
  }

  const player = (name, turn, char) => {
    return { name, turn, char }
  }

  const playerVsPlayer = (name1, name2) => {
    title.textContent = 'Player Vs Player';
    players.push(player(name1, true, 'X'));
    players.push(player(name2, false, 'O'));
  }

  const clearBoard = function() {
    players.length = 0;
    tiles.forEach(tile => board.removeChild(tile));
    tiles.length = 0;
    count = 0;
    results.textContent = '';
  }

  return {
    tiles,
    createBoard,
    takeTurn,
    player,
    playerVsPlayer
  }
})();