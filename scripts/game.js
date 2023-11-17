// GLOBAL VARIABLES
// Initializes global variables to count rounds and points
let round = 0;
let playerPoints = 0;
let computerPoints = 0;

// Page buttons
const gameButtons = document.querySelectorAll(".btn-game");
const newGame = document.querySelector("#new-game");

// EVENT LISTENERS
// Starts a new round
gameButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const computerChoice = getComputerChoice();
        const playerChoice = button.id.toUpperCase();
        play(playerChoice, computerChoice);
    });
});

// Starts a new game
newGame.addEventListener("click", () => {
    document.querySelectorAll(".btn-game").forEach(btn => {
        btn.disabled = false;
    });
    round = 1;
    document.getElementById("round").innerHTML = round;
    resetPoints();
    document.querySelectorAll(".log-messages").forEach(function (logs) {
        logs.remove();
    });
    document.getElementById("new-game").disabled = true;
});

// GAME FUNCTIONS
// Randomly gets the computer choice
function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3) + 1;

    switch (choice) {
        case 1:
            return "ROCK";
            break;
        case 2:
            return "PAPER";
            break;
        case 3:
            return "SCISSORS";
            break;
        default:
            console.error("Error 001: Unexpected choice");
    }
}

// Plays a round
function play(player, computer) {
    if (player === computer) {
        logRoundResult("tie", player, computer);
        startNewRound();
    } else
        if (
            (player === "ROCK") && (computer === "SCISSORS") ||
            (player === "SCISSORS") && (computer === "PAPER") ||
            (player === "PAPER") && (computer === "ROCK")
        ) {
            addPoint("player");
            logRoundResult("player", player, computer);
            startNewRound();
            checkResults();
        } else
            if (
                (computer === "ROCK") && (player === "SCISSORS") ||
                (computer === "SCISSORS") && (player === "PAPER") ||
                (computer === "PAPER") && (player === "ROCK")
            ) {
                addPoint("computer");
                logRoundResult("computer", computer, player);
                startNewRound();
                checkResults();
            } else {
                console.error("Error 002: Unexpected combination! Expected ROCK, PAPER or SCISSORS. Received " + player + " and " + computer);
            }
}

// Increments a point to the winner
// The parameter for funcion must be "player" or "computer"
function addPoint(whom) {
    if (whom === "player") {
        playerPoints++;
        document.getElementById("player-points").innerHTML = playerPoints;
    } else
        if (whom === "computer") {
            computerPoints++;
            document.getElementById("computer-points").innerHTML = computerPoints;
        } else {
            console.error("Error 003: Trying to add points to a non-existing object.");
        }
}

// Resets game by setting points to zero and removing the winner highlight
function resetPoints() {
    playerPoints = 0;
    computerPoints = 0;
    document.getElementById("player-points").innerHTML = playerPoints;
    document.getElementById("player").style.removeProperty("background-color");
    document.getElementById("computer-points").innerHTML = computerPoints;
    document.getElementById("computer").style.removeProperty("background-color");
}

// Logs the round result to the tracker panel
// The winner parameter must be "player", "computer" or "tie"
function logRoundResult(winner, winnerChoice, loserChoice) {
    let logMessage = "";

    if (winner === "player") {
        logMessage = "Round #" + round + ": You win! " + winnerChoice + " beats " + loserChoice;
    } else
        if (winner === "computer") {
            logMessage = "Round #" + round + ": You lose! " + winnerChoice + " beats " + loserChoice;
        } else {
            logMessage = "Round #" + round + ": It's a tie!";
        }
    // Manipulates DOM elements to append the round result
    const tracker = document.getElementById("tracker");
    const log = document.createTextNode(logMessage);
    const newLine = document.createElement("p");
    tracker.appendChild(newLine).className = "log-messages";
    newLine.appendChild(log);
}

// Increments a round to the counter and page
function startNewRound() {
    round++;
    document.getElementById("round").innerHTML = round;
}

// Checks if anyone achieved 5 points, if so sets the winner
function checkResults() {
    if (
        (playerPoints === 5) ||
        (computerPoints === 5)
    ) {
        document.querySelectorAll(".btn-game").forEach(btn => {
            btn.disabled = true;
        });
        setWinner();
        document.getElementById("new-game").disabled = false;
    }
}

// Highlights the winner in the results panel
function setWinner() {
    if(playerPoints > computerPoints) {
        document.getElementById("player").style.setProperty("background-color", "yellow");
    } else
    if(computerPoints > playerPoints) {
        document.getElementById("computer").style.setProperty("background-color", "yellow");
    } else {
        document.getElementById("player").style.setProperty("background-color", "yellow");
        document.getElementById("computer").style.setProperty("background-color", "yellow");
    }
}