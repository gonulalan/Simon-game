var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

function playSound(color) {
  var sound = new Audio("./sounds/" + color + ".mp3");
  sound.play();
}

$(document).on("keydown", function (e) {
  if (level === 0 && e.key === "a") nextSequence();
});

$(".btn").click(function () {
  if (level > 0) clickHandler(this.id);
});

function clickHandler(id) {
  var userChosenColour = id;
  playSound(id);
  userClickedPattern.push(userChosenColour);
  animatePress(id);
  checkAnswer(userClickedPattern.length - 1);
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  var sound = new Audio("./sounds/wrong.mp3");
  sound.play();
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("h1").text("Press A Key to Start");
}

function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    if (gamePattern.length === index + 1) nextSequence();
  } else {
    gameOver();
  }
}
