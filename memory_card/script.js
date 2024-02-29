document.addEventListener("DOMContentLoaded", () => {
    // Timer logic
    var timeLeft = 180; // 3 minutes in seconds
    const totalPairs = 18;

    var timerInterval = setInterval(function() {
        timeLeft--;
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        document.getElementById('timer').innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        if (timeLeft <= 0) {
            endGame(false); // Pass false to indicate the game ended due to time out
        }
    }, 1000); // Update every second
});

const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
var timerInterval;


function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

calculateScore = () => {
    return matched * 10;
}


function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;

        if (matched === 18) {
           endGame(true); // Pass true to indicate the game ended due to successful matching
        }
    }
    else {

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}
}


function endGame(success) {
    var score = calculateScore();
    var game = JSON.parse(localStorage.getItem('game'));
    game.memory_card_score = score;
    game.totalScore += score;
    game.memory_card = false;
    localStorage.setItem('game', JSON.stringify(game));

    let message = success ? 'Congratulations! You matched all pairs. Your score is ' + score + '.' : 'Time is up! Your score is ' + score + '.';
    setTimeout(() => {
        alert(message + ' Click OK to return to the main menu.');
        window.location.href = "../index.html";
    }, 500); // Add a slight delay to allow the last match to be visible before alerting and redirecting
}


function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [];
    // For 36 cards, repeat 5 images 6 times and 2 images 5 times
    // Adjusting the distribution of 7 unique images
    for(let i = 1; i <= 6; i++) {
        for(let j = 1; j <= 6; j++) {
            arr.push(j);
        }
    }

    // Shuffle the array
    arr.sort(() => Math.random() - 0.5);

    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        // Adjust image assignment logic to use the shuffled array
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}


shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
