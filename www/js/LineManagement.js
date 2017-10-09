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
      $('#name-forward-left').html(UserTeam.line1[LEFT_FWD].firstName + '<br> ' + UserTeam.line1[LEFT_FWD].lastName);
      $('#name-forward-center').html(UserTeam.line1[CENTER_FWD].firstName + '<br> ' + UserTeam.line1[CENTER_FWD].lastName);
      $('#name-forward-right').html(UserTeam.line1[RIGHT_FWD].firstName + '<br> ' + UserTeam.line1[RIGHT_FWD].lastName);
      break;
    case 2:
      $('#name-forward-left').html(UserTeam.line2[LEFT_FWD].firstName + '<br> ' + UserTeam.line2[LEFT_FWD].lastName);
      $('#name-forward-center').html(UserTeam.line2[CENTER_FWD].firstName + '<br> ' + UserTeam.line2[CENTER_FWD].lastName);
      $('#name-forward-right').html(UserTeam.line2[RIGHT_FWD].firstName + '<br> ' + UserTeam.line2[RIGHT_FWD].lastName);
      break;
    case 3:
      $('#name-forward-left').html(UserTeam.line3[LEFT_FWD].firstName + '<br> ' + UserTeam.line3[LEFT_FWD].lastName);
      $('#name-forward-center').html(UserTeam.line3[CENTER_FWD].firstName + '<br> ' + UserTeam.line3[CENTER_FWD].lastName);
      $('#name-forward-right').html(UserTeam.line3[RIGHT_FWD].firstName + '<br> ' + UserTeam.line3[RIGHT_FWD].lastName);
      break;
    case 4:
      $('#name-forward-left').html(UserTeam.line4[LEFT_FWD].firstName + '<br> ' + UserTeam.line4[LEFT_FWD].lastName);
      $('#name-forward-center').html(UserTeam.line4[CENTER_FWD].firstName + '<br> ' + UserTeam.line4[CENTER_FWD].lastName);
      $('#name-forward-right').html(UserTeam.line4[RIGHT_FWD].firstName + '<br> ' + UserTeam.line4[RIGHT_FWD].lastName);
      break;
  }
}

function defenderSwitch(lineNum){
  switch(lineNum){
    case 1:
      $('#name-defense-left').html(UserTeam.pair1[LEFT_DEF].firstName + '<br> ' + UserTeam.pair1[LEFT_DEF].lastName);
      $('#name-defense-right').html(UserTeam.pair1[RIGHT_DEF].firstName + '<br> ' + UserTeam.pair1[RIGHT_DEF].lastName);
      break;
    case 2:
      $('#name-defense-left').html(UserTeam.pair2[LEFT_DEF].firstName + '<br> ' + UserTeam.pair2[LEFT_DEF].lastName);
      $('#name-defense-right').html(UserTeam.pair2[RIGHT_DEF].firstName + '<br> ' + UserTeam.pair2[RIGHT_DEF].lastName);
      break;
    case 3:
      $('#name-defense-left').html(UserTeam.pair3[LEFT_DEF].firstName + '<br> ' + UserTeam.pair3[LEFT_DEF].lastName);
      $('#name-defense-right').html(UserTeam.pair3[RIGHT_DEF].firstName + '<br> ' + UserTeam.pair3[RIGHT_DEF].lastName);
      break;
  }
}

function goalieSwitch(lineNum){
  switch(lineNum){
    case 1:
      $('#name-goalie').html(UserTeam.goalie1[STARTER_GOALIE].firstName + '<br> ' + UserTeam.goalie1[STARTER_GOALIE].lastName);
      break;
    case 2:
      $('#name-goalie').html(UserTeam.goalie2[BACKUP_GOALIE].firstName + '<br> ' + UserTeam.goalie2[BACKUP_GOALIE].lastName);
      break;
  }
}

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
