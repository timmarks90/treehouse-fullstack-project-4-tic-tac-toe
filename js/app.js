// Create name input on Welcome Screen
const nameInput = document.createElement('input');
const endScreen = document.querySelector('#finish');
endScreen.style.display = 'none';

// Defining boxes to store values in once user clicks box
xBox = [];
oBox = [];

nameInput.placeholder = 'What\'s your name?';
nameInput.style.display = 'block';
nameInput.style.margin = '50px auto';
nameInput.style.padding = '20px';
nameInput.style.width = '250px';
nameInput.style.borderRadius = '5px';
nameInput.style.borderStyle = 'none';

// Insert name input on welcome screen
const startButton = document.querySelector('#start .button');
startButton.parentNode.insertBefore(nameInput, startButton);
nameInput.focus();
const gameTitle = document.createElement('h2');
gameTitle.innerHTML = 'Select your game mode';
gameTitle.style.color = '#fff';
const gameMode = document.createElement('div');
gameMode.className = 'game-mode';
const playerButton = document.createElement('button');
playerButton.className = 'game-button player';
const computerButton = document.createElement('button');
computerButton.className = 'game-button computer';

// Display player name and opponent on page once game has begun
const name = opponent => {
    const board = document.querySelector('#board header');
    const playerNameDiv = document.createElement('div');
    playerNameDiv.className = 'player-name';
    const playerNameTitle = document.createElement('h2');
    playerNameTitle.style.margin = '50px auto';
    playerNameTitle.style.textAlign = 'center';
    playerNameTitle.style.color = '#444';
    playerNameTitle.innerHTML = nameInput.value + ' vs ' + opponent;
    playerNameDiv.appendChild(playerNameTitle);
    board.appendChild(playerNameDiv);
}

// Select game mode: Player or Computer
const game = () => {   
    // Style player and computer button
    const buttonStyle = (button, message) => {
        button.style.margin = '20px 20px 50px';
        button.borderRadius = '5px';
        button.style.padding = '20px 50px';
        button.style.border = '2px solid #fff';
        button.style.borderRadius = '5px';
        button.style.background = 'none';
        button.style.color = '#fff';
        button.style.textAlign = 'center';
        button.style.display = 'inline-block';
        button.innerHTML = message;
    }
    buttonStyle(playerButton, 'Play Human');
    buttonStyle(computerButton, 'Play Computer');
    gameMode.appendChild(gameTitle);
    gameMode.appendChild(playerButton);
    gameMode.appendChild(computerButton);
    startButton.parentNode.insertBefore(gameMode, startButton);
}
game();

// change style of game mode buttons on hover
playerButton.addEventListener('mouseover', () => {
    playerButton.style.background = '#fff';
    playerButton.style.color = '#54D17A';
})
// change style of game mode buttons on hover
playerButton.addEventListener('mouseout', () => {
    if (playerButton.classList.contains('active')) {
        playerButton.style.background = '#fff';
        playerButton.style.color = '#54D17A';
    } else {
        playerButton.style.background = 'none';
        playerButton.style.color = '#fff';
    }
})
// change style of game mode buttons on hover
computerButton.addEventListener('mouseover', () => {
    computerButton.style.background = '#fff';
    computerButton.style.color = '#54D17A';
})
// change style of game mode buttons on hover
computerButton.addEventListener('mouseout', () => {
    if (computerButton.classList.contains('active')) {
        computerButton.style.background = '#fff';
        computerButton.style.color = '#54D17A';
    } else {
        computerButton.style.background = 'none';
        computerButton.style.color = '#fff';
    }
})
// On click of player game mode, set button to active
playerButton.addEventListener('click', () => {
    playerButton.className += ' active';
    if (computerButton.classList.contains('active')) {
        computerButton.style.background = 'none';
        computerButton.style.color = '#fff';
        computerButton.classList.remove('active');
    }
})

// On click of computer game mode, set button to active
computerButton.addEventListener('click', () => {
    computerButton.className += ' active';
    if (playerButton.classList.contains('active')) {
        playerButton.style.background = 'none';
        playerButton.style.color = '#fff';
        playerButton.classList.remove('active');
    }
})
const validateStart = () => {
    if(nameInput.value == '') {
        // Show error if user tried to start game without entering name
        nameInput.style.border = '2px solid rgb(255, 104, 104)';
    } 
    else if (playerButton.classList.contains('active') == false && computerButton.classList.contains('active') == false) {
        gameTitle.style.color = 'rgb(255, 104, 104)';
    } 
    else if (playerButton.classList.contains('active')) {
        name('Human');
        startScreen.style.display = 'none';
    }
    else if (computerButton.classList.contains('active')) {
        name('Computer');
        startScreen.style.display = 'none';
    }
}
// On click of start button, hide intro screen
const startScreen = document.querySelector('#start');
    startButton.addEventListener('click', () => {
    validateStart();
});

// Start the game if user clicked the Enter key on keyboard after typing in name on welcome screen
nameInput.addEventListener("keydown", e => {
    if(e.keyCode == 13) {
        validateStart();
    }
})

const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');

// Set player 1 active
function player1Turn() {
    player2.classList.remove('active');
    player1.className += ' active';
}
// On game load, set player 1 turn to active
player1Turn();

// Set player 2 active
function player2Turn() {
    player1.classList.remove('active');
    player2.className += ' active';
}

const box = document.getElementsByClassName('box');

// // Show active player icon on hover of each box
function boxMouseOver() {
    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('mouseover', () => {
            if (player1.classList.contains('active') && box[i].classList.contains('box-filled-2') == false) {
                box[i].style.backgroundImage = "url(img/o.svg)";
            } else if (player2.classList.contains('active') && box[i].classList.contains('box-filled-1') == false) {
                box[i].style.backgroundImage = "url(img/x.svg)";
            }
        });
    }
}
boxMouseOver();

// Remove active player icon when curser leaves box
function boxMouseOut() {
    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('mouseout', e => {
            if (e.target.classList.contains('box-filled-1') == false || e.target.classList.contains('box-filled-2') == false) {
                e.target.style.backgroundImage = "";
            }
        });    
    }
}
boxMouseOut();

// On click of a box, fill box to set target player's move and switch active players
function boxClick() {
    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('click', e => {
            if(playerButton.classList.contains('active')) {
                if (player1.classList.contains('active') && (e.target.classList.contains('box-filled-1') == false && e.target.classList.contains('box-filled-2') == false)) {
                    e.target.className += ' box-filled-1';
                    oBox.push(e.target[i]);
                    endGame();
                    player2Turn();
                } else if (player2.classList.contains('active') && (e.target.classList.contains('box-filled-1') == false && e.target.classList.contains('box-filled-2') == false)) {
                    e.target.className += ' box-filled-2';
                    xBox.push(e.target[i]);
                    endGame();
                    player1Turn();
                }
            } else if(computerButton.classList.contains('active')) {
                if (player1.classList.contains('active') && (e.target.classList.contains('box-filled-1') == false && e.target.classList.contains('box-filled-2') == false)) {
                    e.target.className += ' box-filled-1';
                    oBox.push(e.target[i]);
                    endGame();
                    player2Turn();
                    computerPlay();
                    endGame();
                    player1Turn();
                }
            }

        })
    }
}
boxClick();

// Logic on which boxes will produce winning moves for a player
const winningMoves = [
    [box[0], box[1], box[2]],
    [box[3], box[4], box[5]],
    [box[6], box[7], box[8]],
    [box[0], box[3], box[6]],
    [box[1], box[4], box[7]],
    [box[2], box[5], box[8]],
    [box[0], box[4], box[8]],
    [box[2], box[4], box[6]]
];

// Declare winning player and show the proper winning page
function endGame() {
    for (let i = 0; i < winningMoves.length; i++) {
        const oWins = winningMoves[i][0].classList.contains('box-filled-1') && winningMoves[i][1].classList.contains('box-filled-1') && winningMoves[i][2].classList.contains('box-filled-1');
        const xWins = winningMoves[i][0].classList.contains('box-filled-2') && winningMoves[i][1].classList.contains('box-filled-2') && winningMoves[i][2].classList.contains('box-filled-2');
        if(oWins == true) {
            newGamePage(nameInput.value + ' Wins!', ' screen-win-one');
        } else if (xWins == true) {
            newGamePage('Winner', ' screen-win-two');
        } else if ((oWins == false || xWins == false) && (xBox.length + oBox.length == 9)) {
            if(endScreen.classList.contains('screen-win-tie')) {
                break;
            } else {
                newGamePage('It\'s a Tie!', ' screen-win-tie');
                console.log('tie');
            }
        }
    }
}

// Winning page for the player who won
function newGamePage(message, winningPage) {
    endScreen.style.display = 'block';
    endScreen.className += winningPage;
    const winMessage = document.querySelector('.message');
    winMessage.innerHTML = message;
    const newGameButton = document.querySelector('#finish .button');
    // When user clicks New Game, show board and reset values to begin new game
    newGameButton.addEventListener('click', () => {
        endScreen.style.display = 'none';
        resetGame();
    })
}

// Reset game to beginning default values
function resetGame() {
    nameInput.value = '';
    const playerTitle = document.querySelector('.player-name');
    if(endScreen.classList.contains('screen-win-one') || endScreen.classList.contains('screen-win-two') || endScreen.classList.contains('screen-win-tie')) {
        endScreen.classList.remove('screen-win-one');
        endScreen.classList.remove('screen-win-two');
        endScreen.classList.remove('screen-win-tie');
    }
    for (let i = 0; i < box.length; i++) {
        box[i].classList.remove('box-filled-1');
        box[i].classList.remove('box-filled-2');
    }
    xBox = [];
    oBox = [];
    player1Turn();
    nameInput.focus();
}

// Player against computer
function computerPlay() {
    for (let i = 0; i < winningMoves.length && player2.classList.contains('active'); i++) {
        // If computer has 2 in a row, play winning turn
        if(winningMoves[i][0].classList.contains('box-filled-2') && winningMoves[i][1].classList.contains('box-filled-2') && !winningMoves[i][2].classList.contains('box-filled-1')){
            winningMoves[i][2].className += ' box-filled-2';
            console.log('comp move 1');
            xBox.push(winningMoves[i][2]);
            endGame();
            player1Turn();
            break;
        } else if(winningMoves[i][1].classList.contains('box-filled-2') && winningMoves[i][2].classList.contains('box-filled-2') && !winningMoves[i][0].classList.contains('box-filled-1')){
            winningMoves[i][0].className += ' box-filled-2';
            console.log('comp move 2');
            xBox.push(winningMoves[i][0]);
            endGame();
            player1Turn();
            break;
        } else if(winningMoves[i][0].classList.contains('box-filled-2') && winningMoves[i][2].classList.contains('box-filled-2') && !winningMoves[i][1].classList.contains('box-filled-1')){
            winningMoves[i][1].className += ' box-filled-2';
            console.log('comp move 3');
            xBox.push(winningMoves[i][1]);
            endGame();
            player1Turn();
            break;
        } 
        // Prevent Player 1 from winning by stopping 3rd in a row
        else if(winningMoves[i][0].classList.contains('box-filled-1') && winningMoves[i][1].classList.contains('box-filled-1') && !winningMoves[i][2].classList.contains('box-filled-2')){
            winningMoves[i][2].className += ' box-filled-2';
            console.log('comp move 4');
            xBox.push(winningMoves[i][2]);
            endGame();
            player1Turn();
            break;
        } 
        else if (winningMoves[i][0].classList.contains('box-filled-1') && winningMoves[i][2].classList.contains('box-filled-1') && !winningMoves[i][1].classList.contains('box-filled-2')){
            winningMoves[i][1].className += ' box-filled-2';
            xBox.push(winningMoves[i][1]);
            console.log('comp move 5');
            endGame();
            player1Turn();
            break;
        }
        else if (winningMoves[i][1].classList.contains('box-filled-1') && winningMoves[i][2].classList.contains('box-filled-1') && !winningMoves[i][0].classList.contains('box-filled-2')){
            winningMoves[i][0].className += ' box-filled-2';
            xBox.push(winningMoves[i][0]);
            console.log('comp move 6');
            endGame();
            player1Turn();
            break;
        }
        // Play move after 1 turn by player 1
        else if(winningMoves[i][0].classList.contains('box-filled-1') && !winningMoves[i][1].classList.contains('box-filled-1') && !winningMoves[i][2].classList.contains('box-filled-1')  && !winningMoves[i][1].classList.contains('box-filled-2')){
            winningMoves[i][1].className += ' box-filled-2';
            xBox.push(winningMoves[i][1]);
            console.log('comp move 7');
            endGame();
            player1Turn();
            break;
        } 
        else if(winningMoves[i][1].classList.contains('box-filled-1') && !winningMoves[i][0].classList.contains('box-filled-1') && !winningMoves[i][2].classList.contains('box-filled-1') && !winningMoves[i][2].classList.contains('box-filled-2')){
            winningMoves[i][2].className += ' box-filled-2';
            xBox.push(winningMoves[i][2]);
            console.log('comp move 8');
            endGame();
            player1Turn();
            break;
        } 
        else if(winningMoves[i][2].classList.contains('box-filled-1') && !winningMoves[i][0].classList.contains('box-filled-1') && !winningMoves[i][1].classList.contains('box-filled-1') && !winningMoves[i][1].classList.contains('box-filled-2')){
            winningMoves[i][1].className += ' box-filled-2';
            console.log('comp move 9');
            xBox.push(winningMoves[i][1]);
            endGame();
            player1Turn();
            break;
        } 
    }
}