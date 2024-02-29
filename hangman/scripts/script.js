

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

let currentWord, correctLetters, wrongGuessCount, gamesPlayed = 0, totalScore = 0, timerInterval, timeRemaining = 40;
const maxGuesses = 6;
const pointsPerGame = 100;
const pointsLossPerWrongGuess = pointsPerGame / maxGuesses;
const timerDisplay = document.querySelector(".timer");

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
    timeRemaining = 40; // Reset timer to 40 seconds
    timerDisplay.innerText = `Time left: ${timeRemaining}s`;

    if (gamesPlayed >= 3) {
        alert(`Game over! Your total score: ${totalScore}`);
        gamesPlayed = 0;
        totalScore = 0;
    }
    clearInterval(timerInterval); // Clear any existing timer intervals
};

const startTimer = () => {
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = `Time left: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval); // Stop the timer
            gameOver(false); // Trigger game over due to time running out
        }
    }, 1000);
};

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toUpperCase();
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    resetGame();
    startTimer(); // Start the timer for the new word
};


const gameOver = (isVictory) => {
    clearInterval(timerInterval); 
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats! Moving to next Round' : 'Bummer! Moving to next Round';
    gameModal.querySelector("p").innerHTML = `${isVictory ? 'You found the word:' : 'The correct word was:'} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
    gamesPlayed++;
    totalScore += isVictory ? pointsPerGame - (wrongGuessCount * pointsLossPerWrongGuess) : 0;
    
    if (gamesPlayed < 3) {
        setTimeout(getRandomWord, 3000);
    } else {
        var game = JSON.parse(localStorage.getItem('game')) ;
        game.hangman_score = totalScore;
        game.totalScore = (game.totalScore || 0) + totalScore;
        game.hangman = false;
        localStorage.setItem('game', JSON.stringify(game));
        alert(`Game over! Your total score: ${totalScore}`);
        window.location.href = "../../index.html";
    }
};

const createKeyboard = () => {
    keyboardDiv.innerHTML = ''; // Clear existing keyboard if any
    for (let i = 65; i <= 90; i++) { // A-Z
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        keyboardDiv.appendChild(button);
        button.addEventListener("click", () => initGame(button, button.innerText));
    }
};

const initGame = (button, clickedLetter) => {
    button.disabled = true;

    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters[index] = letter; // Store correct guesses by position
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
            }
        });

        // Check for win
        const isComplete = [...currentWord].every((letter, index) => correctLetters[index] === letter);
        if (isComplete) gameOver(true);
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        if(wrongGuessCount === maxGuesses) gameOver(false);
    }

    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
};

createKeyboard();
getRandomWord();
