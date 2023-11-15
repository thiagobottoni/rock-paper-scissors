// Initialize the global variable to count rounds
let round = 0;

const buttons = document.querySelectorAll(".btn-game");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const computerChoice = getComputerChoice();
        const playerChoice = button.id.toUpperCase();
        play(playerChoice, computerChoice);
    });
});

const newGame = document.querySelector("#new-game");
newGame.addEventListener("click", () => {
    document.querySelectorAll(".btn-game").forEach(btn => {
        btn.disabled = false;
    });
    round = 1;
    document.getElementById("round").innerHTML = round;
    resetPoints();
    document.querySelectorAll(".log-messages").forEach(function(logs) {
        logs.remove();
    })
});

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

function play(player, computer) {
    if (player === computer) {
        console.log("It's a tie!");
        addPoint("player");
        addPoint("computer");
        logRoundResult("tie", player, computer);
        startNewRound();
    } else
        if (
            (player === "ROCK") && (computer === "SCISSORS") ||
            (player === "SCISSORS") && (computer === "PAPER") ||
            (player === "PAPER") && (computer === "ROCK")
        ) {
            console.log("Player wins");
            addPoint("player");
            logRoundResult("player", player, computer);
            startNewRound();
        } else
            if (
                (computer === "ROCK") && (player === "SCISSORS") ||
                (computer === "SCISSORS") && (player === "PAPER") ||
                (computer === "PAPER") && (player === "ROCK")
            ) {
                console.log("Computer wins");
                addPoint("computer");
                logRoundResult("computer", computer, player);
                startNewRound();
            } else {
                console.error("Error 002: Unexpected combination! Expected ROCK, PAPER or SCISSORS. Received " + player + " and " + computer);
            }
}

// The parameter for funcion must be "player" or "computer"
function addPoint(whom) {
    let playerPoints = parseInt(document.getElementById(whom + "-points").innerHTML, 10);
    document.getElementById(whom + "-points").innerHTML = playerPoints + 1;
}

function resetPoints() {
    document.getElementById("player-points").innerHTML = 0;
    document.getElementById("computer-points").innerHTML = 0;
}

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

    const tracker = document.getElementById("tracker");
    const log = document.createTextNode(logMessage);
    const newLine = document.createElement("p");
    tracker.appendChild(newLine).className = "log-messages";
    newLine.appendChild(log);
}

function startNewRound() {
    round++;
    document.getElementById("round").innerHTML = round;
}
