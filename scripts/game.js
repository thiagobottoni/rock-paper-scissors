const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const computerChoice = getComputerChoice();
        const playerChoice = button.id.toUpperCase();
        play(playerChoice, computerChoice);
    });
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
    } else
        if (
            (player === "ROCK") && (computer === "SCISSORS") ||
            (player === "SCISSORS") && (computer === "PAPER") ||
            (player === "PAPER") && (computer === "ROCK")
        ) {
            console.log("Player wins");
            addPoint("player");
            logRoundResult("player", player, computer);
        } else
            if (
                (computer === "ROCK") && (player === "SCISSORS") ||
                (computer === "SCISSORS") && (player === "PAPER") ||
                (computer === "PAPER") && (player === "ROCK")
            ) {
                console.log("Computer wins");
                addPoint("computer");
                logRoundResult("computer", computer, player);
            } else {
                console.error("Error 002: Unexpected combination! Expected ROCK, PAPER or SCISSORS. Received " + player + " and " + computer);
            }
}

// The parameter for funcion must be "player" or "computer"
function addPoint(whom) {
    let playerPoints = parseInt(document.getElementById(whom + "-points").innerHTML, 10);
    document.getElementById(whom + "-points").innerHTML = playerPoints + 1;
}

// The winner parameter must be "player", "computer" or "tie"
function logRoundResult(winner, winnerChoice, loserChoice) {
    let logMessage = "";

    if (winner === "player") {
        logMessage = "You win! " + winnerChoice + " beats " + loserChoice;
    } else
        if (winner === "computer") {
            logMessage = "You lose! " + winnerChoice + " beats " + loserChoice;
        } else {
            logMessage = "It's a tie!";
        }

    const tracker = document.getElementById("tracker");
    const log = document.createTextNode(logMessage);
    const newLine = document.createElement("br");
    tracker.appendChild(newLine);
    tracker.appendChild(log);
}
