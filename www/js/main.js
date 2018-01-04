
$(document).ready(function() {


  $('#fatigue-progress-bar-forward-left').css('width','100%');

/*my litle git test
*/
  var shotPowerF = $('#shotPowerSlideF').val() / 100;
  var shotAccuracyF = $('#shotAccuracySlideF').val() / 100;
  var confidenceF = $('#confidenceSlideF').val() / 100;
  var shotPowerD = $('#shotPowerSlideD').val() / 100;
  var shotAccuracyD = $('#shotAccuracySlideD').val() / 100;
  var confidenceD = $('#confidenceSlideD').val() / 100;
  var savePercentageNum = $('#savePercentageSlide').val() / 100;
  var confidenceG = 1 + $('#confidenceSlideG').val() / 1000;
  var consistencyG = $('#consistencySlideG').val() / 1000;
  $('#shotPowerNumF').text('Shot Power: ' + shotPowerF);
  $('#shotAccuracyNumF').text('Shot Accuracy: ' + shotAccuracyF);
  $('#confidenceNumF').text('Confidence: ' + confidenceF);
  $('#shotPowerNumD').text('Shot Power: ' + shotPowerD);
  $('#shotAccuracyNumD').text('Shot Accuracy: ' + shotAccuracyD);
  $('#confidenceNumD').text('Confidence: ' + confidenceD);
  $('#savePercentageNum').text('Save Percentage: ' + savePercentageNum);
  $('#confidenceNumG').text('Confidence: ' + confidenceG);
  $('#consistencyNumG').text('Consistency: ' + consistencyG);
});

$('#passing').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    UserTeam.offensiveStrategies.passing = value/100;
  }


});

$('#shooting').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
    UserTeam.offensiveStrategies.shooting = value/100;

  }
});

$('#shot-tipping').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
    UserTeam.offensiveStrategies.tipping = value/100;

  }
});

$('#goalie-screening').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
    UserTeam.offensiveStrategies.screening = value/100;

  }
});

$('#shot-blocking').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
    UserTeam.defensiveStrategies.shotBlocking = value/100;

  }
});



$('#team-agressiveness').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(UserTeam);
    UserTeam.offensiveStrategies.aggresiveness = value/100;

  }
});

var upperHalfGestures = new Hammer(document.getElementById('upper-half-div'));
upperHalfGestures.on('swipe', function(ev){
  if(ev.target.td !== null){
    console.log(true);
  }else{
    console.log(false);
  }
  var string = ev.target.innerHTML;
    console.log(string.indexOf('rangeslider'));
});


$('#carrying-puck').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
  }
});

$('#dumping-puck').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
  }
});


//Handles simulation speed modifiers
$('input[id="simSpeedOption1x"]').change( function() {
  GAME_PROGRESSION_RATE_MODIFIER = 1;
});

$('input[id="simSpeedOption2x"]').change( function() {
  GAME_PROGRESSION_RATE_MODIFIER = 2;
});

$('input[id="simSpeedOption3x"]').change( function() {
  GAME_PROGRESSION_RATE_MODIFIER = 3;
});

$('input[id="simSpeedOption10x"]').change( function() {
  GAME_PROGRESSION_RATE_MODIFIER = 10;
});
/////////////////////////////////////////////////////////
//THIS IS THE OFFICIAL GAME OBJECT for the game being played
var game = Object.create(GameProgression);//universal game object

UserTeam.setAllPlayers();
line1();
pair1();

function togglePause(){
  game.pause();
  if(game.isPaused){
      $('#button-pause').css('color', 'red');
  }else{
    $('#button-pause').css('color', 'white');
  }
}

//quits current match and resets the game to inital values
function quit(){

  var quitting = confirm('Are you sure you want to quit?')

  if (quitting) {//reset the game!

    if(game.isPaused){//cannot reset if paused
      togglePause();
    }

    game.reset();

    UserTeam.statReset();
    UserTeam.playerReset();

    CPUTeam.statReset();


    $('#lower-half-div').text('');



  }
}

function simulate(){
  var UserWins = 0;
  var CPUWins = 0;
  var ties = 0;
  for(var i = 0; i < 1; i++){
    game.beginGame();
    if(game.recordWinner() === 'UserTeam'){
      UserWins++;
    }
    else if(game.recordWinner() === 'CPUTeam'){
      CPUWins++;
    }
    else if(game.recordWinner() === 'tie'){
      ties++;
    }
    game.printToTicker(GameProgression.messages);
    //game.reset();

  }

  //  var x = $('#lower-half-div').children().length;
}
