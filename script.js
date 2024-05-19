const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
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
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS: X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(condition => 
        condition.every(index => state[index] === currentClass))
}

function isDraw() {
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
function getAvailableCells() {
    return state.map((cell, index) => cell == '' ? index : null) 
}

function minimax(player) {
    // return best move

    const availableCells = getAvailableCells()


    // terminal state
    if (checkWin(player)) {
        return -1;
    } else if (isDraw()) {
        return 0;
    } else if (checkWin(player == CIRCLE_CLASS ? X_CLASS : CIRCLE_CLASS)) {
        return 1;
    }

    let moves = [];

    for (let i = 0; i < availableCells.length; i++) {
        let move 
    }





}