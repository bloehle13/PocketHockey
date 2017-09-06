
$(document).ready(function() {

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

$('#shotTipping').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
    UserTeam.offensiveStrategies.tipping = value/100;

  }
});

$('#goalieScreening').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
    UserTeam.offensiveStrategies.screening = value/100;

  }
});

$('#shotBlocking').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
    UserTeam.offensiveStrategies.shotBlocking = value/100;

  }
});

$('#teamAgressiveness').rangeslider({
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
    console.log(ev);
});



/*


NEEDS TO BE IMPLEMENTED STILL
*/
$('#carryingPuck').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
  }
});

$('#dumpingPuck').rangeslider({
  polyfill: false,
  onSlide: function(position, value) {
    console.log(value);
  }
});



$(document).on('input', '#shotPowerSlideF', function() {
    var shotPowerF = $('#shotPowerSlideF').val() / 100;
    forward1.shotPower = shotPowerF;
    forward2.shotPower = shotPowerF;
    $('#shotPowerNumF').text('Shot Power: ' + shotPowerF);
});
$(document).on('input', '#shotAccuracySlideF', function() {
    var shotAccuracyF = $('#shotAccuracySlideF').val() / 100;
    forward1.shotAccuracy = shotAccuracyF;
    forward2.shotAccuracy = shotAccuracyF;
    $('#shotAccuracyNumF').text('Shot Accuracy: ' + shotAccuracyF);
});
$(document).on('input', '#confidenceSlideF', function() {
    var confidenceF = $('#confidenceSlideF').val() / 100;
    forward1.confidence = confidenceF;
    forward2.confidence = confidenceF;
    $('#confidenceNumF').text('Confidence: ' + confidenceF);
});
$(document).on('input', '#shotPowerSlideD', function() {
    var shotPowerD = $('#shotPowerSlideD').val() / 100;
    defender1.shotPower = shotPowerD;
    $('#shotPowerNumD').text('Shot Power: ' + shotPowerD);
});
$(document).on('input', '#shotAccuracySlideD', function() {
    var shotAccuracyD = $('#shotAccuracySlideD').val() / 100;
    defender1.shotAccuracy = shotAccuracyD;
    $('#shotAccuracyNumD').text('Shot Accuracy: ' + shotAccuracyD);
});
$(document).on('input', '#confidenceSlideD', function() {
    var confidenceD = $('#confidenceSlideD').val() / 100;
    defender1.confidence = confidenceD;
    $('#confidenceNumD').text('Confidence: ' + confidenceD);
});
$(document).on('input', '#savePercentageSlide', function() {
    var savePercentageNum = $('#savePercentageSlide').val() / 100;
    goalie1.savePercentage = savePercentageNum;
    $('#savePercentageNum').text('Save Percentage: ' + savePercentageNum);
});
$(document).on('input', '#confidenceSlideG', function() {
    var confidenceG = 1 + $('#confidenceSlideG').val() / 1000;
    goalie1.confidence = confidenceG;
    $('#confidenceNumG').text('Confidence: ' + confidenceG);
});
$(document).on('input', '#consistencySlideG', function() {
    var consistencyG = $('#consistencySlideG').val() / 1000;
    goalie1.consistency = consistencyG;
    $('#consistencyNumG').text('Consistency: ' + consistencyG);
});

function simulate(){
  var game = Object.create(GameProgression);
  var UserWins = 0;
  var CPUWins = 0;
  var ties = 0;
  for(var i = 0; i < 1; i++){
    game.progressGame();
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
  $('#lower-half-div').append("<br>" + 'User: ' + UserWins);
  $('#lower-half-div').append("<br>" + 'CPU: ' + CPUWins);
  $('#lower-half-div').append("<br>" + 'ties: ' + ties);
  //  var x = $('#lower-half-div').children().length;
}
