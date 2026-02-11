var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var start=false;
var level=0;

function restart()
{
    start=false;
    level=0;
    gamePattern=[];
    $("#level-title").text("Press A Key to Start");
}
$(document).keydown(function(){
    if(!start)
    {
        $("#level-title").text("Level "+level);
        start=true;
        nextSequence();
    }
})
function checkanswer(currentlevel)
{
   if(userPattern[currentlevel]===gamePattern[currentlevel])
   {
      if(gamePattern.length===userPattern.length)
      {
        setTimeout(function(){
            nextSequence();
        },1000);
      }

   }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
     $("body").removeClass("game-over");
  },200);
    restart();
   }
}
$(".btn").click(function(){
 var userChosenColour=$(this).attr("id");
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkanswer(userPattern.length-1);
})

function nextSequence()
{
    userPattern=[];
    level++;
  $("#level-title").text("Level "+ level);
  var ran=Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[ran];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}
function animatePress(color)
{
  $("#"+color).addClass("pressed");
  setTimeout(function(){$("#"+color).removeClass("pressed");},100);
}