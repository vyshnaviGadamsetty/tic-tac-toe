
let boxes = document.querySelectorAll(".box");
let winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];
let turn0 = true; // X starts
filled = 0; // Initialize the fill with 0

// Function to clear the board
const clearBoard = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false; // Enable the box for a new game
    });
    document.getElementById("winnerMessage").style.display = "none"; // Hide winner message
};

// Event listener for box clicks
boxes.forEach((box) =>
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "X";
            turn0 = false; // Switch to O
        } else {
            box.innerText = "O";
            turn0 = true; // Switch to X
        }
        box.disabled = true; // Disable the box after a click
        filled++; // Incrementing the filled value 
        checkWinner();

        // Check for tie after the box is filled and no winner is found
        if (filled === boxes.length && !checkWinner()) {
            tiemsg(); // Display the tie message
        }
    })
);

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winning) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos1 === pos3) {
            console.log(`The winner is ${pos1}`);
            disablebtn();
            winnermsg(pos1); // Display the winner's message
            return true; // Return true when a winner is found
        }
    }
    return false; // No winner found
};

// Function to disable all boxes (after a winner is found)
const disablebtn = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to show winner message
const winnermsg = (winner) => {
    const winnerMessageDiv = document.getElementById("winnerMessage");
    winnerMessageDiv.innerText = `The winner is ${winner}`; // Set the text of the winner message
    winnerMessageDiv.style.display = "block"; // Show the winner message
};

// Function to show tie message
const tiemsg = () => {
    const winnerMessage = document.getElementById("winnerMessage");
    winnerMessage.style.display = "block";
    winnerMessage.innerText = "It's a tie!";
};

// New Game button functionality
document.getElementById("newgame").addEventListener("click", () => {
    clearBoard(); // Clear the board and reset the game state
    turn0 = true;
    filled = 0; // X starts first
});

// Reset Game button functionality
document.getElementById("resetgame").addEventListener("click", () => {
    clearBoard();
    filled = 0; // Clear the board but keep the same turn
});