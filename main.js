const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const winOverlay = document.getElementById('win-overlay');
const winnerText = document.getElementById('winner-text');

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""]; // Tracks moves
let gameActive = true;

// All possible winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Check if cell is already filled or game is over
    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.style.color = currentPlayer === "X" ? "#e74c3c" : "#2ecc71";
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") continue;
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showWinAnimation(`${currentPlayer} Wins!`);
        gameActive = false;
        return;
    }

    // Check for draw
    if (!gameState.includes("")) {
        showWinAnimation("It's a Draw!");
        gameActive = false;
        return;
    }

    // Switch Player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function showWinAnimation(message) {
    winnerText.innerText = message;
    winOverlay.style.display = 'flex';
    // Auto-hide overlay after 3 seconds or keep until restart
    setTimeout(() => { winOverlay.style.display = 'none'; }, 3000);
}

function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.innerText = "Player X's Turn";
    cells.forEach(cell => cell.innerText = "");
    winOverlay.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);