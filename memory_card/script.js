document.addEventListener("DOMContentLoaded", () => {

    // Timer logic
var timeLeft = 120; // 2 minutes in seconds

var timerInterval = setInterval(function() {
  timeLeft--;
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft % 60;
  document.getElementById('timer').innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    var score = calculateScore();
    var game = JSON.parse(localStorage.getItem('game'));
    game.memory_card_score = score;
    game.totalScore = game.totalScore + score;
    game.memory_card = false;
    localStorage.setItem('game', JSON.stringify(game));
    alert('Time is up!' + ' Your score is' + score + '. Click OK to return to the main menu.');
    window.location.href = "../index.html";
  }
}, 1000); // Update every second
});

const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;


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
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
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

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    // Adjust for 24 pairs, assuming you have 12 unique images and each is used twice
    let arr = [
        1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12
    ];
    for(let i = 1; i <= 24; i++) {
        arr.push(i <= 12 ? i : i - 12);
        arr.push(i <= 12 ? i : i - 12);
    }
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        // Adjust image assignment logic if necessary
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}


shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});