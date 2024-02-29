document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem('game')) {
        saveToMemory();
        }
        var game = JSON.parse(localStorage.getItem('game'));
       
    
    document.getElementById('capture').addEventListener('click', function() {
        html2canvas(document.body).then(function(canvas) {
            var name = prompt("Please enter your team name:");
            // Convert the canvas to a data URL
            var dataURL = canvas.toDataURL();
            // Create a link to download the data URL as an image
            var link = document.createElement('a');
            link.href = dataURL;
            link.download = name + "_"+ game.totalScore + ".png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            localStorage.removeItem('game');
            alert("Your score has been saved. Click OK to return to the main menu.");
            window.location.href = "../../index.html";
            saveToMemory(); 
        });
    });

 
     
    if (game.game_2048 == false) {
        var game_2048 = document.getElementById('game_2048').getElementsByTagName('a')[0];
        game_2048.style.display = 'none';
    }

    if (game.guessTheLogo == false) {
        var guessTheLogo = document.getElementById('guess_the_logo').getElementsByTagName('a')[0];
        guessTheLogo.style.display = 'none';
    }

    if (game.memory_card == false) {
        var memory_card = document.getElementById('memory_card').getElementsByTagName('a')[0];
        memory_card.style.display = 'none';
    }

    if (game.speed_typing == false) {
        var speed_typing = document.getElementById('speed_typing').getElementsByTagName('a')[0];
        speed_typing.style.display = 'none';
    }

    if (game.hangman == false) {
        var hangman = document.getElementById('hangman');
        hangman.style.display = 'none';
    }

    if (game.maze == false) {
        var maze = document.getElementById('maze').getElementsByTagName('a')[0];
        maze.style.display = 'none';
    }

    if(game.flappy_bird == false) {
        var flappy_bird = document.getElementById('flappy_bird').getElementsByTagName('a')[0];
        flappy_bird.style.display = 'none';
    }


    var score = document.getElementById('score');
    score.innerHTML = "Your Score: " + game.totalScore;

});


var game_2048 = true;
var hangman = true;
var guessTheLogo = true;
var memory_card = true;
var speed_typing = true;
var maze = true;
var flappy_bird = true;
var totalScore = 0;
var game_2048_score = 0;
var hangman_score = 0;
var guessTheLogo_score = 0;
var memory_card_score = 0;
var speed_typing_score = 0;
 
saveToMemory = () => {
    const game = {
        game_2048: game_2048,
        hangman: hangman,
        guessTheLogo: guessTheLogo,
        memory_card: memory_card,
        speed_typing: speed_typing,
        totalScore: totalScore,
        game_2048_score: game_2048_score,
        hangman_score: hangman_score,
        guessTheLogo_score: guessTheLogo_score,
        memory_card_score: memory_card_score,
        speed_typing_score: speed_typing_score,
        maze: maze,
        flappy_bird: flappy_bird
    };
    localStorage.setItem('game', JSON.stringify(game));
}
