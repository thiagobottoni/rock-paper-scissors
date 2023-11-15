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
        return 2;
    } else
        if (
            (player === "ROCK") && (computer === "SCISSORS") ||
            (player === "SCISSORS") && (computer === "PAPER") ||
            (player === "PAPER") && (computer === "ROCK")
        ) {
            return 1;
        } else
            if (
                (computer === "ROCK") && (player === "SCISSORS") ||
                (computer === "SCISSORS") && (player === "PAPER") ||
                (computer === "PAPER") && (player === "ROCK")
            ) {
                return 0;
            } else {
                console.warn("Expected ROCK, PAPER or SCISSORS. Received " + player + " and " + computer);
                return -1;
            }
}

const rock = document.querySelector('#rock');
rock.addEventListener('click', () => {
    const computerChoice = getComputerChoice();
    const playerChoice = "ROCK";
    const roundResult = play(playerChoice, computerChoice);

    if (roundResult === 1) {
        console.log("Player wins");
        addPoint("player");
        logRoundResult("player", playerChoice, computerChoice);
    } else
        if (roundResult === 0) {
            console.log("Computer wins");
            addPoint("computer");
            logRoundResult("computer", computerChoice, playerChoice);
        } else
            if (roundResult === 2) {
                console.log("It's a tie!");
                addPoint("player");
                addPoint("computer");
                logRoundResult("tie", playerChoice, computerChoice);
            }
            else {
                console.error("Error 002: Unexpected combination");
            }
});

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