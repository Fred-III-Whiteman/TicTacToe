const X_CLASS = 'X';
const O_CLASS = 'O';
const cellElements = document.querySelectorAll('.cell');
const gameOverElement = document.querySelector('.gameOver');
let circleTurn;

//TODO: COMMENT YOUR CODE!!!!

//TODO: add functionality to .start
    //TODO: Single-player should function as is
    //TODO: Multi-Player should use the minimax instead (will not the the curser hover for 'O's)
    //TODO: Once a button is pressed hide the .start area and display the .gemType

//TODO: Incorporate the .cover class and block the user from selecting or hovering over tiles

//TODO: add functionality to .gameType
    //TODO: If single player it should read "Vs. AI"
    //TODO: If multi-player it should say "Player 1's turn/ Player 2's turn"
    //TODO: Hide once game is over

//TODO: Add functionality to the quit button
    //TODO: it should refresh the page or return it to the start state

//TODO: Work in the "miniMax" algorithm and try to get a better understanding of it / write it in a more readable way

//TODO: Add Colour to the tiles during the endgame state?

//TODO: Add a "coin flip" so its not always Player 1 starting the game?

//TODO: Refactor all code so its more semantic/readable

//TODO: Incorporate onto Fred-III-Whiteman.io

const setBoardHoverClass = function() {
    const board = document.querySelector('.board');
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);

    if(circleTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

const swapTurns = function() {
    circleTurn = !circleTurn;
}

const placeMark = function(cell, currentPlayer) {
    cell.classList.add(currentPlayer);
}

const checkWin = function(currentPlayer) {
    const WIN_COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    return WIN_COMBOS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer)
        });
    });
 }

 const isDraw = function() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

const endGame = function(draw) {
    const WinningMessage = document.querySelector('.winner');
    if(draw) {
        WinningMessage.innerText = "Draw!";
    } else {
        WinningMessage.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
    }
    gameOverElement.classList.add('show');
}

const handleClick = function(evt) {
    const cell = evt.target;
    const currentPlayer = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentPlayer);
    if(checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

const startGame = function() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    });
    setBoardHoverClass();
    gameOverElement.classList.remove('show');
}

startGame();

const restartButton = document.getElementById('playAgain')
    .addEventListener('click', startGame());