const startButton = document.getElementById('start');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const alertElement = document.getElementById('alert');
const restartButton = document.getElementById('restart');
const playerXRename = document.getElementById('player1');
const playerORename = document.getElementById('player2');

let playerX = '';
let playerO = '';

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

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
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.onclick = () => handleCellClick(index); // Attach event listener
    cellElement.textContent = cell;
    if (cell === 'X') {
      cellElement.classList.add('X');
    } else if (cell === 'O') {
      cellElement.classList.add('O');
    }
    boardElement.appendChild(cellElement);
  });
};

const startGame = () => {
  playerX = playerXInput.value.trim();
  playerO = playerOInput.value.trim();

  // Validate that both names are provided
  if (playerX === '' || playerO === '') {
    alert("Both player names must be filled in.");
    return;
  }

  playerXRename.innerText = playerX;
  playerORename.innerText = playerO;

  // Hide input fields
  playerXInput.style.display = 'none';
  playerOInput.style.display = 'none';
  startButton.style.display = 'none';

  // Show player names
  playerXRename.style.display = 'block';
  playerORename.style.display = 'block';

  // Initialize the game
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusElement.textContent = `${playerX}'s Turn`;
  statusElement.style.display = 'block';
  alertElement.style.display = 'none';
  renderBoard();
  boardElement.style.display = 'grid';
  restartButton.style.display = 'inline';
};

const handleCellClick = (index) => {
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  const winner = checkResult(); // Check for a winner after the move
  if (winner) {
    gameActive = false;
    alertElement.textContent = `${winner === 'X' ? playerX : playerO} Wins!`;
    alertElement.classList.add('alert-success');
    alertElement.style.display = 'block';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `${currentPlayer === 'X' ? playerX : playerO}'s Turn`;
  }
  renderBoard();
};

const checkResult = () => {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
      return board[a]; // Return the winning player ('X' or 'O')
    }
  }
  // Check for a draw
  if (!board.includes('')) {
    gameActive = false;
    alertElement.textContent = `It's a Draw!`;
    alertElement.classList.remove('alert-success');
    alertElement.classList.add('alert-warning');
    alertElement.style.display = 'block';
  }
  return null; // No winner found
};

const restartGame = () => {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  alertElement.style.display = 'none';
  statusElement.textContent = `${playerX}'s Turn`;
  renderBoard();
};

// Event listeners
startButton.onclick = startGame;
restartButton.onclick = restartGame;

renderBoard();