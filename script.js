const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

let ai = X_CLASS



const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.querySelector('.winning-message')
const restartButton = document.getElementById('restart')
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('#board')

let circleTurn

let state = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    state = [
        '', '', '',
        '', '', '',
        '', '', ''
      ];
    winningMessageElement.classList.remove('show')
    aiMove()
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS: X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(state, currentClass)) {
        endGame(false)
    } else if (isDraw(state)) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
        aiMove()
    }
}

function aiMove() {
    const move = minimax(state, ai)
    const index = move.index
    const cell = getCellElementByIndex(index)
    const currentClass = circleTurn ? CIRCLE_CLASS: X_CLASS
    placeMark(cell, currentClass)
    cell.removeEventListener('click', handleClick)
    if (checkWin(state, currentClass)) {
        endGame(false)
    } else if (isDraw(state)) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function checkWin(state, currentClass) {
    return WINNING_COMBINATIONS.some(condition => 
        condition.every(index => state[index] === currentClass))
}

function isDraw(state) {
    return state.every(cell => {
        return cell != ''
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = `Draw!`
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function getCellElementByIndex(index) {
    return document.querySelector(`[data-cell="${index + 1}"]`);
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
    state[cell.getAttribute('data-cell') - 1] = currentClass
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    const currentClass = circleTurn ? CIRCLE_CLASS: X_CLASS
    board.classList.add(currentClass)

}

// get empty boxes
function getAvailableCells(curState) {
    return curState.map((cell, index) => cell == '' ? index : null)
        .filter(index => index !== null) // remove so the length reflects number of avail cells
}

function minimax(state, player) {
    let availableCells = getAvailableCells(state);

    // Terminal states
    if (checkWin(state, X_CLASS)) {
        return { score: 10 };
    } else if (checkWin(state, CIRCLE_CLASS)) {
        return { score: -10 };
    } else if (isDraw(state)) {
        return { score: 0 };
    }

    // Moves array
    let moves = [];

    // Iterate over available cells to simulate each move
    for (let cell of availableCells) {
        let move = {};
        move.index = cell;
        
        // Apply the move
        state[cell] = player;

        // Recursively call minimax for the next player
        if (player == X_CLASS) {
            let result = minimax(state, CIRCLE_CLASS);
            move.score = result.score;
        } else {
            let result = minimax(state, X_CLASS);
            move.score = result.score;
        }

        // Revert the move
        state[cell] = '';

        // Save the move
        moves.push(move);
    }

    // Choose the best move
    let bestMove;
    if (player == X_CLASS) {
        let bestScore = -Infinity;
        for (let move of moves) {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let move of moves) {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        }
    }

    return bestMove;
}
