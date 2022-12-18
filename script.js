
const game = (() => {
  'use strict'

  // Initializing variables
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

  // DOM element selections
  const board = document.querySelector('.board');
  const results = document.querySelector('.game-results');
  const pvpNameEntry = document.querySelector('.pvp-name-entry');
  const pveNameEntry = document.querySelector('.pve-name-entry');
  const title = document.querySelector('.title');
  const restart = document.querySelector('.restart-btn');
  const playPVP = document.querySelector('.play-pvp-btn');
  const playPVE = document.querySelector('.play-pve-btn');
  const pvp = document.querySelector('.pvp-btn');
  const pve = document.querySelector('.pve-btn');
  const menuBtn = document.querySelector('.menu-btn');
  const backBtn = document.querySelector('.back-btn');
  const tictactoe = document.querySelector('.game');
  const tictactoeMenu = document.querySelector('.menu');
  const pvePlayer = document.getElementById('player');
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');

  // FUNCTIONS

  // Creates game board
  const createBoard = function() {
    for (let i = 0; i < 9; i++) {
      const div = document.createElement('div');
      div.classList.add('tile');
      div.addEventListener('click', takeTurn);
      board.appendChild(div);
      tiles.push(div);
    }
  }

  // Plays current players turn
  const takeTurn = function() {
    count++;
    this.textContent = players.find(player => player.turn === true).char;
    this.removeEventListener('click', takeTurn);
    let status = checkWin(count);
    if (status === 'win' || status === 'draw') {
      endGame(status);
      return;
    };
    changeTurn();

    if (title.textContent == 'Player Vs Computer' && players.find(player => player.name == 'Computer').turn == true) {
      dumbAI(count);
      let status = checkWin(count);
      if (status === 'win' || status === 'draw') endGame(status);
      changeTurn();
    }
  }

  // Changes players turns
  const changeTurn = function() {
    players.forEach(player => {
      player.turn === true ? player.turn = false : player.turn = true;
    });
  }
  
  // Checks for win conditions
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

  // Ends game, disabling buttons and displaying winner
  const endGame = function(status) {
    status === 'win' ? results.textContent = `${players.find(player => player.turn === true).name} wins!` : results.textContent = 'Draw';
    tiles.forEach(tile => tile.removeEventListener('click', takeTurn));
  }

  // Player factory function
  const player = (name, turn, char) => {
    return { name, turn, char }
  }

  // Starts PVP game
  const playerVsPlayer = function() {
    title.textContent = 'Player Vs Player';
    players.length = 0;
    createBoard();
    players.push(player((player1.value == '' ? 'Player 1' : player1.value), true, 'X'));
    players.push(player((player1.value == '' ? 'Player 2' : player2.value), false, 'O'));
    pvpNameEntry.classList.add('hidden');
    tictactoe.classList.remove('hidden');
  }

  // Starts PVE game
  const playerVsComputer = function() {
    title.textContent = 'Player Vs Computer';
    players.length = 0;
    createBoard();
    players.push(player((pvePlayer.value == '' ? 'Player' : pvePlayer.value), true, 'X'));
    players.push(player('Computer', false, 'O'));
    pveNameEntry.classList.add('hidden');
    tictactoe.classList.remove('hidden');
  }

  // Changes screen to player name entry for pvp
  const playerNames = function() {
    tictactoeMenu.classList.add('hidden');
    pvpNameEntry.classList.remove('hidden');
  }

  const playerName = function() {
    tictactoeMenu.classList.add('hidden');
    pveNameEntry.classList.remove('hidden');
  }

  // Clears tiles and resets moves
  const clearBoard = function() {
    tiles.forEach(tile => board.removeChild(tile));
    tiles.length = 0;
    count = 0;
    results.textContent = '';
  }

  // Restarts current game with current players
  const restartGame = function() {
    clearBoard();
    createBoard()
    players.find(player => player.char === 'X').turn = true;
    players.find(player => player.char === 'O').turn = false;
  }

  // Returns to main menu from game
  const returnToMenu = function() {
    clearBoard();
    resetNames();
    tictactoe.classList.add('hidden');
    tictactoeMenu.classList.remove('hidden');
  }

  // Returns to main menu from player select
  const back = function () {
    resetNames();
    pvpNameEntry.classList.add('hidden');
    tictactoeMenu.classList.remove('hidden');
  }

  // Resets names in input fields
  const resetNames = function() {
    player1.value = 'Player 1';
    player2.value = 'Player 2';
    pvePlayer.value = 'Player';
  }

  // Dumb random number generator to select moves for computer
  const dumbAI = function(count) {
    if (count === 9) return;
    let selectedTile = Math.floor(Math.random() * 9) ;
    console.log(selectedTile);
    console.log(tiles[selectedTile].textContent);
    if (tiles[selectedTile].textContent == '') {
      tiles[selectedTile].textContent = players.find(player => player.turn == true).char;
      tiles[selectedTile].removeEventListener('click', takeTurn);
    } else {
      console.log('hi');
      dumbAI();
    }
  }

  // EVENT LISTENERS

  restart.addEventListener('click', restartGame);

  playPVP.addEventListener('click', playerVsPlayer);

  playPVE.addEventListener('click', playerVsComputer);

  menuBtn.addEventListener('click', returnToMenu);

  pvp.addEventListener('click', playerNames);

  pve.addEventListener('click', playerName);

  backBtn.addEventListener('click', back);

  return {
    dumbAI,
    createBoard,
    tiles
  }
})();
