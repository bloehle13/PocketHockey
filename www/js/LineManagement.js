/**
NUMBERS REFER TO INDEX IN ARRAY IN WHICH EACH LINE STORES ITS PLAYERS IN UserTeam
*/
var LEFT_FWD = 0;
var CENTER_FWD = 1;
var RIGHT_FWD = 2;

var LEFT_DEF = 0;
var RIGHT_DEF = 1;

var STARTER_GOALIE = 0;
var BACKUP_GOALIE = 1;

function forwardSwitch(lineNum){
  switch(lineNum){
    case 1:
      UserTeam.changePlayers(1, UserTeam.currentPair, UserTeam.currentGoalie);
      $('#name-forward-left').html(UserTeam.line1[LEFT_FWD].firstName + '<br> ' + UserTeam.line1[LEFT_FWD].lastName);
      $('#name-forward-center').html(UserTeam.line1[CENTER_FWD].firstName + '<br> ' + UserTeam.line1[CENTER_FWD].lastName);
      $('#name-forward-right').html(UserTeam.line1[RIGHT_FWD].firstName + '<br> ' + UserTeam.line1[RIGHT_FWD].lastName);

      $('#fatigue-progress-bar-forward-left').css('width', UserTeam.line1[0].energy*100 + "%");
      $('#fatigue-progress-bar-forward-center').css('width', UserTeam.line1[1].energy*100 + "%");
      $('#fatigue-progress-bar-forward-right').css('width', UserTeam.line1[2].energy*100 + "%");
      break;
    case 2:
      UserTeam.changePlayers(2, UserTeam.currentPair, UserTeam.currentGoalie);
      $('#name-forward-left').html(UserTeam.line2[LEFT_FWD].firstName + '<br> ' + UserTeam.line2[LEFT_FWD].lastName);
      $('#name-forward-center').html(UserTeam.line2[CENTER_FWD].firstName + '<br> ' + UserTeam.line2[CENTER_FWD].lastName);
      $('#name-forward-right').html(UserTeam.line2[RIGHT_FWD].firstName + '<br> ' + UserTeam.line2[RIGHT_FWD].lastName);

      $('#fatigue-progress-bar-forward-left').css('width', UserTeam.line2[0].energy*100 + "%");
      $('#fatigue-progress-bar-forward-center').css('width', UserTeam.line2[1].energy*100 + "%");
      $('#fatigue-progress-bar-forward-right').css('width', UserTeam.line2[2].energy*100 + "%");
      break;
    case 3:
      UserTeam.changePlayers(3, UserTeam.currentPair, UserTeam.currentGoalie);
      $('#name-forward-left').html(UserTeam.line3[LEFT_FWD].firstName + '<br> ' + UserTeam.line3[LEFT_FWD].lastName);
      $('#name-forward-center').html(UserTeam.line3[CENTER_FWD].firstName + '<br> ' + UserTeam.line3[CENTER_FWD].lastName);
      $('#name-forward-right').html(UserTeam.line3[RIGHT_FWD].firstName + '<br> ' + UserTeam.line3[RIGHT_FWD].lastName);

      $('#fatigue-progress-bar-forward-left').css('width', UserTeam.line3[0].energy*100 + "%");
      $('#fatigue-progress-bar-forward-center').css('width', UserTeam.line3[1].energy*100 + "%");
      $('#fatigue-progress-bar-forward-right').css('width', UserTeam.line3[2].energy*100 + "%");
      break;
    case 4:
      UserTeam.changePlayers(4, UserTeam.currentPair, UserTeam.currentGoalie);
      $('#name-forward-left').html(UserTeam.line4[LEFT_FWD].firstName + '<br> ' + UserTeam.line4[LEFT_FWD].lastName);
      $('#name-forward-center').html(UserTeam.line4[CENTER_FWD].firstName + '<br> ' + UserTeam.line4[CENTER_FWD].lastName);
      $('#name-forward-right').html(UserTeam.line4[RIGHT_FWD].firstName + '<br> ' + UserTeam.line4[RIGHT_FWD].lastName);

      $('#fatigue-progress-bar-forward-left').css('width', UserTeam.line4[0].energy*100 + "%");
      $('#fatigue-progress-bar-forward-center').css('width', UserTeam.line4[1].energy*100 + "%");
      $('#fatigue-progress-bar-forward-right').css('width', UserTeam.line4[2].energy*100 + "%");
      break;
  }
}

function defenderSwitch(lineNum){
  switch(lineNum){
    case 1:
      UserTeam.changePlayers(UserTeam.currentLine, 1, UserTeam.currentGoalie);
      $('#name-defense-left').html(UserTeam.pair1[LEFT_DEF].firstName + ' ' + UserTeam.pair1[LEFT_DEF].lastName);
      $('#name-defense-right').html(UserTeam.pair1[RIGHT_DEF].firstName + ' ' + UserTeam.pair1[RIGHT_DEF].lastName);

      $('#fatigue-progress-bar-defense-left').css('width', UserTeam.pair1[0].energy*100 + "%");
      $('#fatigue-progress-bar-defense-right').css('width', UserTeam.pair1[1].energy*100 + "%");
      break;
    case 2:
      UserTeam.changePlayers(UserTeam.currentLine, 2, UserTeam.currentGoalie);
      $('#name-defense-left').html(UserTeam.pair2[LEFT_DEF].firstName + ' ' + UserTeam.pair2[LEFT_DEF].lastName);
      $('#name-defense-right').html(UserTeam.pair2[RIGHT_DEF].firstName + ' ' + UserTeam.pair2[RIGHT_DEF].lastName);

      $('#fatigue-progress-bar-defense-left').css('width', UserTeam.pair2[0].energy*100 + "%");
      $('#fatigue-progress-bar-defense-right').css('width', UserTeam.pair2[1].energy*100 + "%");
      break;
    case 3:
      UserTeam.changePlayers(UserTeam.currentLine, 3, UserTeam.currentGoalie);
      $('#name-defense-left').html(UserTeam.pair3[LEFT_DEF].firstName + ' ' + UserTeam.pair3[LEFT_DEF].lastName);
      $('#name-defense-right').html(UserTeam.pair3[RIGHT_DEF].firstName + ' ' + UserTeam.pair3[RIGHT_DEF].lastName);

      $('#fatigue-progress-bar-defense-left').css('width', UserTeam.pair3[0].energy*100 + "%");
      $('#fatigue-progress-bar-defense-right').css('width', UserTeam.pair3[1].energy*100 + "%");
      break;
  }
}

function goalieSwitch(lineNum){
  // switch(lineNum){
  //   case 1:
  //     $('#name-goalie').html(UserTeam.goalie1[STARTER_GOALIE].firstName + '<br> ' + UserTeam.goalie1[STARTER_GOALIE].lastName);
  //     break;
  //   case 2:
  //     $('#name-goalie').html(UserTeam.goalie2[BACKUP_GOALIE].firstName + '<br> ' + UserTeam.goalie2[BACKUP_GOALIE].lastName);
  //     break;
  // }
}


/*
onclick methods for the line/pair/goalie change buttons
*/
function line1(){
  forwardSwitch(1);
}

function line2(){
  forwardSwitch(2);
}

function line3(){
  forwardSwitch(3);
}

function line4(){
  forwardSwitch(4);
}

function pair1(){
  defenderSwitch(1);
}

function pair2(){
  defenderSwitch(2);
}

function pair3(){
  defenderSwitch(3);
}

function goalie1(){
  goalieSwitch(1);
}

function goalie2(){
  goalieSwitch(2);
}
