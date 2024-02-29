

var counter = 0;
var arrayOfIcons = [
  "devicon-docker-plain colored",
  "devicon-css3-plain colored",
  "devicon-android-plain colored",
  "devicon-amazonwebservices-plain-wordmark colored",
  "devicon-aftereffects-plain",
  "devicon-python-plain",
  "devicon-github-plain",
  "devicon-apache-line",
  "devicon-atom-original",
  "devicon-ruby-plain",
  "devicon-java-plain",
  "devicon-chrome-plain",
  "devicon-firefox-plain",
  "devicon-jquery-plain",
  "devicon-rails-plain",
  "devicon-nodejs-plain colored",
  "devicon-react-original colored",
  "devicon-angularjs-plain colored",
  "devicon-vuejs-plain colored",
  "devicon-mongodb-plain-wordmark colored",
  "devicon-mysql-plain-wordmark colored",
  "devicon-redis-plain-wordmark colored",
  "devicon-kubernetes-plain-wordmark colored",
  "devicon-webpack-plain colored",
  "devicon-sass-original colored"
];
var userAnswers = [];
var correctAnswers = [
  "docker",
  "css3",
  "android",
  "amazon web services",
  "aftereffects",
  "python",
  "github",
  "apache",
  "atom",
  "ruby",
  "java",
  "chrome",
  "firefox",
  "jquery",
  "rails",
  "nodejs",
  "react",
  "angular",
  "vuejs",
  "mongodb",
  "mysql",
  "redis",
  "kubernetes",
  "webpack",
  "sass"
];

function startGame() {
  document.getElementById("beforeGame").style.display = "none";
  document.getElementById("inGame").style.display = "inline";
  // Set the initial class for the logo to display the first logo
  document.getElementById("image").className = arrayOfIcons[counter]; // Use the counter which starts at 0
  document.getElementById("guessbox").focus();
}


function submit() {
  userAnswers.push(document.getElementById("guessbox").value.replace(/\s+/g, '').toLowerCase());
  if (counter >= arrayOfIcons.length) {
    endGame();
  }
  document.getElementById("guessbox").value = "";
  document.getElementById("guessbox").focus();
  document.getElementById("image").className = arrayOfIcons[counter];
  counter++;
}

function endGame() {
  var score = 0;
  var missedAnswers = [];
  for (var i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] == correctAnswers[i]) {
      score++;
    } else {
      missedAnswers.push(" " + correctAnswers[i]);
    }
  }
  document.getElementById("score").innerHTML = score + " / " + correctAnswers.length;
  var game = JSON.parse(localStorage.getItem('game'));
  game.guessTheLogo_score = score;
  game.totalScore = game.totalScore + score;
  game.guessTheLogo = false;
  localStorage.setItem('game', JSON.stringify(game));
  if (score < correctAnswers.length) {
    document.getElementById("missed").innerHTML = "(In case you were wondering, you missed: " + missedAnswers + ")";
  }
  document.getElementById("inGame").style.display = "none";
  document.getElementById("afterGame").style.display = "inline";
    alert("Game over! Click OK to return to the main menu.");
    window.location.href = "../index.html"; 
  

}

document.getElementById("playBtn").onclick = function() {startGame()};
document.getElementById("submitBtn").onclick = function() {submit()};
document.getElementById("guessbox")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("submitBtn").click();
    }
});


