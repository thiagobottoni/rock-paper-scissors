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

function game() {
    let playerScore = 0;
    let computerScore = 0;

    do {
        let playerChoice = prompt("Whats your choice? Rock, paper or scissors?").toUpperCase();

        let computerChoice = getComputerChoice();

        let gameResult = play(playerChoice, computerChoice);

        if (gameResult === 1) {
            console.log("You win! " + playerChoice + " beats " + computerChoice);
            playerScore++;
        } else
        if (gameResult === 0) {
            console.log("You lose! " + computerChoice + " beats " + playerChoice);
            computerScore++;
        } else
        if (gameResult === 2) {
            console.log("It's a tie!");
            playerScore++;
            computerScore++;
        } else {
            console.error("Error 002: Unexpected combination");
            break;
        }
    } while (
        (playerScore < 5) && (computerScore < 5)
    )

    console.log("GAME RESULTS: \n PLAYER: " + playerScore + "\n COMPUTER: " + computerScore);
}

game();