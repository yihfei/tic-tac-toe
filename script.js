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

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('#board')

let circleTurn

startGame()

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    })
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS: X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        console.log("winner")
    }

    swapTurns()
    setBoardHoverClass()

}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
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

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        // TRUE as long as one combination is satisfied
        return combination.every(index => {
            // TRUE if every cell elemnt in combination indices is the same current class
            return cellElements[index].classList.contains(currentClass)
        })
    })
}