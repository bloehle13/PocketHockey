var UserTeam = Object.create(Team);
UserTeam.offensiveStrategies = Object.create(OffensiveSliders),
UserTeam.defensiveStrategies = Object.create(DefensiveSliders),
UserTeam.name = 'UserTeam';
UserTeam.players = [lefleurGuy, loehleBrandon, gulliverAnthony, beyerPhillipe, lacroixPierre];

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

UserTeam.goalie1 = [UserTeam.goalie];
UserTeam.goalie2 = [];
UserTeam.goalies = [UserTeam.goalie1, UserTeam.goalie2]

//Left wings can be center, right wings can be left wing, etc. However, array
//shows positions left to right on actual game screen. Index 0 = LW, 1 = C,
//2 = RW, 3 = LD, 4 = RD
UserTeam.getPlayerPositionOnScreen = function(player){

  var index = -1;

  for(var i = 0; i < this.players.length; i++){
    if(this.players[i] == player){
      //console.log('found player');
      index = i;
    }
  }

  if(index > -1){//player was found
    return index;
  }else{//no player was found
    return -1;
  }

}

/*Push all players into an array*/
UserTeam.setAllPlayers = function(){
  UserTeam.allPlayers = UserTeam.line1.concat(UserTeam.line2, UserTeam.line3, UserTeam.line4,
                                              UserTeam.pair1, UserTeam.pair2, UserTeam.pair3);
}

/*Drain all players on ice by variable amounts*/
UserTeam.genericDrainEnergy = function(){

  for(var i = 0; i < UserTeam.players.length; i++){
      UserTeam.players[i].energy -= Math.random() * 0.1;
  }

  $('#fatigue-progress-bar-forward-left').css('width', UserTeam.players[0].energy*100 + "%");
  $('#fatigue-progress-bar-forward-center').css('width', UserTeam.players[1].energy*100 + "%");
  $('#fatigue-progress-bar-forward-right').css('width', UserTeam.players[2].energy*100 + "%");
  $('#fatigue-progress-bar-defense-left').css('width', UserTeam.players[3].energy*100 + "%");
  $('#fatigue-progress-bar-defense-right').css('width', UserTeam.players[4].energy*100 + "%");

}

/*Recharges energy of players on the bench*/
UserTeam.rechargeEnergy = function(){

  for(var i = 0; i < UserTeam.allPlayers.length; i++){
    if(!UserTeam.allPlayers[i].onIce && UserTeam.allPlayers[i].energy < 1){//if they are not on the ice
                                                                           //&& energy is not 100%

        UserTeam.allPlayers[i].energy += Math.random() * 0.05;//random amount from 0%-5% each tick of game

        if(UserTeam.allPlayers[i].energy > 1){//if energy is now higher than 100%, set it to 100%
          UserTeam.allPlayers[i].energy = 1;
        }
    }
  }
}

/*Updates the numbers that correspond to lines, pairs, and goalies*/
UserTeam.changePlayers = function(lineNum, pairNum, goalieNum){
  UserTeam.currentLine = lineNum;
  UserTeam.currentPair = pairNum;
  UserTeam.currentGoalie = goalieNum;

  //now update the players with the new numbers for lines and pairs and goalies
  this.updatePlayers();
}

/*To be called locally, just updates the players given the UserTeam.current_____ variables*/
UserTeam.updatePlayers = function(){

  //set the current players to be not onIce, making them gain energy on the bench
  for(var i = 0; i < UserTeam.players.length; i++){
    UserTeam.players[i].onIce = false;
  }

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

    //set these players to be onIce, making them lose energy
    for(var i = 0; i < UserTeam.players.length; i++){
      UserTeam.players[i].onIce = true;
    }

    console.log(UserTeam.players);
    console.log(UserTeam.allPlayers);

}

UserTeam.replenishEnergy = function(){

}
