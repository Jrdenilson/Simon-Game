let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
/*
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    console.log(randomChosenColour);

    
    $('#' + randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50);

    var audio = new Audio('sounds/' + randomChosenColour + '.mp3');
    audio.play();
}*/
var started = false;
var level = 0;


 
$(document).keypress(function(){
    if(!started){
        $('#level-title').text(`Level ${level}`);
        nextSequence();
        started = true ;
    }
});

$('.btn').click(function() {
    var userChosenColour =  $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern)
    animatePress(userChosenColour);
    switch (userChosenColour) {
        case 'green':
            var green = new Audio('sounds/green.mp3');
            green.play();
            break;
        case 'red':
            var red = new Audio('sounds/red.mp3');
            red.play();
            break;
        case 'yellow':
            var yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;
        case 'blue':
            var blue = new Audio('sounds/blue.mp3');
            blue.play();
            break;
        default:
            var wrong = new Audio('sounds/wrong.mp3');
            wrong.play();
            break;
    }
    checkAnswer(userClickedPattern.length-1)
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {
        $('body').addClass('game-over')
        $('#level-title').text(`Game Over, Press Any Key to Restart`);
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        startOver();

        setTimeout(function(){
            $('body').removeClass('game-over')
        }, 200);
    }
}


function nextSequence() {
    level++;
    $('#level-title').text(`Level ${level}`);

    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //1. Use jQuery to select the button with the same id as the randomChosenColour
    //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    
  }

  
function animatePress(currentColour) {
    var pressedColour = $(`.${currentColour}`);
    pressedColour.addClass('pressed');

    setTimeout(function(){
        pressedColour.removeClass("pressed")
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false ;

    
}