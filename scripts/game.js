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
    console.log("Hello World");
});