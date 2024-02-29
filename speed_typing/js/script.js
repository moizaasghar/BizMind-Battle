

const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span");

let timer,
    maxTime = 180, // Initial maxTime for Round 1
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0,
    round = 1; // Initialize round variable
    ranIndex = 0;

function loadParagraph() {
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
    ranIndex++;
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        
        if (charIndex === characters.length - 1) {
            endGame(); // Call endGame when the paragraph is completed
            return; // Stop further execution
        }

        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function endGame() {
    clearInterval(timer);
    inpField.disabled = true; // Disable further typing
    let finalScore = calculateScore();
    
    // Check if the current round is 1, then proceed to round 2
    if (round === 1) {
        alert(`Round 1 Over! Your score is ${finalScore}. Starting Round 2.`);
        round = 2; // Set to Round 2
        resetGame(); // Reset game for Round 2
    } else {
        // This part runs when Round 2 ends
        var game = JSON.parse(localStorage.getItem('game'));
        game.speed_typing_score = finalScore;
        game.totalScore = game.totalScore + finalScore;
        game.speed_typing = false;
        localStorage.setItem('game', JSON.stringify(game));
        alert(`Game Over! Your final score is ${finalScore}. WPM: ${wpmTag.innerText}, Mistakes: ${mistakeTag.innerText}, CPM: ${cpmTag.innerText}`);
        window.location.href = "../../index.html";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        endGame(); // Replace the direct alert call with endGame
    }
}


function calculateScore() {
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    let cpm = charIndex - mistakes;
    let finalScore = (wpm * 10) - (mistakes * 5) + (cpm * 2);
    return finalScore < 0 ? 0 : finalScore;
}


function resetGame() {
    if (round === 2) {
        maxTime = 120; // Set a lower maxTime for Round 2
    }
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    inpField.disabled = false;
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

// Existing event listeners remain the same
loadParagraph();
inpField.addEventListener("input", initTyping);