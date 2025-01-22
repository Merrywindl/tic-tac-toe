const startButton = document.getElementById('start');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const alertElement = document.getElementById('alert');
const restartButton = document.getElementById('restart');
const newGameButton = document.getElementById('newGame');
let playerXRename = document.getElementById('player1');
let playerORename = document.getElementById('player2');

function names () {
  playerXRename.innerText = playerX;
  playerORename.innerText = playerO;
}

const newGame = () => {
  // Show the player name inputs and start button
  playerXInput.style.display = 'inline';
  playerOInput.style.display = 'inline';
  startButton.style.display = 'inline';
  restartButton.style.display = 'none';
  newGameButton.style.display = 'none';
  boardElement.style.display = 'none';
  
  // Reset the player name displays
  playerXRename.style.display = 'none';
  playerORename.style.display = 'none';
  
  // Reset the game state
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusElement.textContent = '';
  alertElement.style.display = 'none';
  renderBoard(); // Update the board to show empty cells
};


let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let storedPlayer = 'X'; // Store the current player before switching

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const renderBoard = () => {
  boardElement.innerHTML = '';
  const cells = [];
  for (let i = 0; i < 9; i++) {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.onclick = () => handleCellClick(i); // Attach event listener outside the function
    boardElement.appendChild(cellElement);
    cells.push(cellElement);
  }
  cells.forEach((cell, index) => {
    if (board[index] === 'X') {
      cell.classList.add('X');
    } else if (board[index] === 'O') {
      cell.classList.add('O');
    }
    cell.textContent = board[index];
  });
};

const renderBoardOnRestart = () => {
  boardElement.innerHTML = '';
  const cells = [];
  for (let i = 0; i < 9; i++) {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.onclick = () => handleCellClick(i); // Attach event listener outside the function
    boardElement.appendChild(cellElement);
    cells.push(cellElement);
  }
  cells.forEach((cell, index) => {
    cell.textContent = '';
  });
  renderBoard(); // Call renderBoard to update the board
};

const startGame = () => {
    playerX = playerXInput.value.trim();
    playerO = playerOInput.value.trim();

    // Validate that both names are provided
    if (playerX === `` || playerO === ``) {
        alert("Both player names must be filled in.");
        return;
    }

    names();

    // Hide input fields only after successful validation
    playerXInput.style.display = 'none';
    playerOInput.style.display = 'none';
    startButton.style.display = 'none';

    playerXRename.style.display = 'block'; // Show player 1 name
    playerORename.style.display = 'block'; // Show player 2 name


    // Reset the game board and state
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X'; // X starts first
    statusElement.textContent = `${playerX}'s Turn`;
    statusElement.style.display = 'block';

    alertElement.style.display = 'none'; // Hide any existing alerts
    renderBoard();
    boardElement.style.display = 'grid';
    restartButton.style.display = 'inline';
    newGameButton.style.display = 'inline';
};

const handleCellClick = (index) => {
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  storedPlayer = currentPlayer; // Store the current player before switching
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusElement.textContent = `${currentPlayer === 'X' ? playerX : playerO}'s Turn`;
  checkResult();
  renderBoard();
};

const checkResult = () => {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
      gameActive = false;
      alertElement.textContent = `${storedPlayer === 'X' ? playerX : playerO} Wins!`;
      alertElement.classList.add('alert-success');
      alertElement.style.display = 'block';
      
      return;
    }
  }
  
  if (!board.includes('')) {
    gameActive = false;
    alertElement.textContent = `It's a Draw!`;
    alertElement.classList.remove('alert-success');
    alertElement.classList.add('alert-warning');
    alertElement.style.display = 'block';
  }
};

const restartGame = () => {
  storedPlayer = 'X';
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  alertElement.style.display = 'none';
  statusElement.textContent = `${currentPlayer}'s Turn`;
  renderBoardOnRestart(); // Call renderBoardOnRestart to update the board on restart
};

startButton.onclick = startGame;
restartButton.onclick = restartGame;
newGameButton.onclick = newGame;
renderBoard();