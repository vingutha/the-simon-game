var gamePattern=[];
var userClickedPattern=[];
var buttonColors = ["red", "blue", "green", "yellow"];

//keep track if the game is started or not and call nextSequence() on first keypress
var started = false;
var level = 0;


//when any key is pressed, the game starts
$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started=true;
  }
});

//generate random color first
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

//buttons blink according to the player's pattern

//detect if any button is clicked and trigger a handler function
$(".btn").click(function(){
 //to store the id of the button that got clicked
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

  //console.log(userClickedPattern);
});


//to check the answer
function checkAnswer(currentLevel){
  if (userClickedPattern [currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence()
      } , 1000); //call nextSequencefunction after 1000 milliseconds delay
    }

  }
  else{
    playSound("wrong");
    $("#body").addClass("game-over");
    setTimeout(function(){
      $("#body").removeClass("game-over");
    }, 200);
    $("#level-title").text("GAME OVER, Press any key to re-start the game");
    startOver();
  }
}// jQuery delay() method to call a function after waiting for some time.

//play sound for respective color
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//when the button is pressed
function animatePress(currentColour){
  var activeColour = $("." + currentColour);
  activeColour.addClass("pressed");

  setTimeout(function(){
    activeColour.removeClass("pressed");
  }, 100);
}

//to re-start the game

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
