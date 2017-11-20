var UserTeam = Object.create(Team);
UserTeam.name = 'UserTeam';
UserTeam.players = [test1, test2, test3, test4, test5];

UserTeam.currentLine = 1;
UserTeam.currentPair = 1;
UserTeam.currentGoalie = 1;

UserTeam.line1 = [lefleurGuy, loehleBrandon, gulliverAnthony];
UserTeam.line2 = [karlssonReed, studleyMike, grantDustin];
UserTeam.line3 = [modonaRobert, brockRene, malikaEvgeni];
UserTeam.line4 = [holmquistBrandan, kaspersikDon, svalestaadJonathan];
UserTeam.lines = [UserTeam.line1, UserTeam.line2, UserTeam.line3, UserTeam.line4];

UserTeam.pair1 = [beyerPhillipe, lacroixPierre];
UserTeam.pair2 = [belovaRussell, porterZack];
UserTeam.pair3 = [sullivanRobert, larssonLucas];
UserTeam.pairs = [UserTeam.pair1, UserTeam.pair2, UserTeam.pair3]

UserTeam.goalie1 = [goalie];
UserTeam.goalie2 = [];
UserTeam.goalies = [UserTeam.goalie1, UserTeam.goalie2]

//Left wings can be center, right wings can be left wing, etc. However, array
//shows positions left to right on actual game screen. Index 0 = LW, 1 = C,
//2 = RW, 3 = LD, 4 = RD
UserTeam.getPlayerPositionOnScreen = function(player){

  var index = -1;

  for(var i = 0; i < this.players.length; i++){
    if(this.players[i] == player){
      console.log('found player');
      index = i;
    }
  }

  if(index > -1){//player was found
    return this.players[index];
  }else{//no player was found
    return null;
  }

}

/*Updates the numbers that correspond to lines, pairs, and goalies*/
function changePlayers(lineNum, pairNum, goalieNum){
  UserTeam.currentLine = lineNum;
  UserTeam.currentPair = pairNum;
  UserTeam.currentGoalie = goalieNum;

  //now update the players with the new numbers for lines and pairs and goalies
  updatePlayers();
}

/*To be called locally, just updates the players given the UserTeam.current_____ variables*/
function updatePlayers(){

  //clear the current players
  UserTeam.players = [];

  //add the forwards to current array of players
  switch(UserTeam.currentLine){
    case 1:
      UserTeam.players = UserTeam.line1;
      break;
    case 2:
      UserTeam.players = UserTeam.line2;
      break;
    case 3:
      UserTeam.players = UserTeam.line3;
      break;
    case 4:
      UserTeam.players = UserTeam.line4;
      break;
    }

  //add the defense to current array of players
  switch(UserTeam.currentPair){
    case 1:
      UserTeam.players = UserTeam.players.concat(UserTeam.pair1);
      break;
    case 2:
      UserTeam.players = UserTeam.players.concat(UserTeam.pair2);
      break;
    case 3:
      UserTeam.players = UserTeam.players.concat(UserTeam.pair3);
      break;
    }

        console.log(UserTeam.players);
}
