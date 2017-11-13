//STATIC VARIABLES DECLARATION
var GAME_PROGRESSION_RATE = 1000;//in ms
var GAME_PROGRESSION_RATE_MODIFIER = 1;

/**
* EVERYTHING in this object is in terms of "game"
* "game" is the universal object for the game that's being played!!!!!
*/
var GameProgression = {

  gameTime: 3600, //60 min
  UserTeamFaceoffs: 0,
  CPUTeamFaceoffs: 0,
  totalFaceoffs: 0,
  messages: [],
  isPaused: false,
  userTeamHasPuck: false,
  cpuTeamHasPuck: false,

  pause: function(){
    game.isPaused = !game.isPaused;
    game.progressGame(game.userTeamHasPuck, game.cpuTeamHasPuck);
  },

  addToMessageQueue: function(message){//adds to array of messages to be printed to ticker
    if(game.getGameClock().indexOf('-') === -1){//prevents printing out a negative time
      game.messages.push(game.getGameClock() + ' - ' + message);
    }
  },

  printOnceToTicker: function(message){
    var gameClock = game.getGameClock();

    if(gameClock.indexOf('-') === -1){//game time is not negative, so it's valid
      $('#lower-half-div').append(game.getGameClock() + ': ' + message);
      $('#lower-half-div').animate({scrollTop: $('#lower-half-div').get(0).scrollHeight}, 10);
    }else{
      //GAME IS OVER
    }
  },

  printToTicker: function(messages){//takes a message and formats it to be posted to the ticker
    console.log(messages.length);
      $('#lower-half-div').append(messages.shift());

      if(messages.length > 0){
        setTimeout(function(){GameProgression.printToTicker(messages)}, GAME_PROGRESSION_RATE / GAME_PROGRESSION_RATE_MODIFIER);
      }

  },

  getGameClock: function(){//formats a clock feel to the current game time
    var min = Math.floor(game.gameTime / 60);
    var formatedMin = ("0" + min).slice(-2);
    var sec = Math.floor(game.gameTime % 60);
    var formatedSec = ("0" + sec).slice(-2);
    return(formatedMin + ":" + formatedSec);
  },

  recordWinner: function(){
    if(UserTeam.goals > CPUTeam.goals){
      return 'UserTeam';
    }
    if(CPUTeam.goals > UserTeam.goals){
      return 'CPUTeam';
    }
    else return 'tie';
  },

  reset: function(){
    UserTeam.reset();
    CPUTeam.reset();
    game.gameTime = 3600;
  },

  faceoff: function(){
    var player1 = UserTeam.getRandomPlayer();
    var player2 = CPUTeam.getRandomPlayer();
    var player1Faceoff = Math.random() * player1.faceoffs;
    var player2Faceoff = Math.random() * player2.faceoffs;

    if(player1Faceoff >= player2Faceoff){

      game.UserTeamFaceoffs++;
      game.totalFaceoffs++;
      CPUTeam.timeInZone = 0;
      CPUTeam.resetAssists();
      UserTeam.addToAssist(player1);
      player1.drainEnergy('faceoff');
      return UserTeam;

    }
    if(player2Faceoff > player1Faceoff){

      game.CPUTeamFaceoffs++;
      game.totalFaceoffs++;
      UserTeam.timeInZone = 0;
      UserTeam.resetAssists();
      CPUTeam.addToAssist(player2);
      player2.drainEnergy('faceoff');
      return CPUTeam;

    }

    else game.faceoff();
  },

  beginGame: function(){
    game.progressGame(false, false);//neither team starts with puck
  },

  progressGame: function(userTeamPosession, cpuTeamPosession){

    if(!game.isPaused){
      game.userTeamHasPuck = userTeamPosession;
      game.cpuTeamHasPuck = cpuTeamPosession;

      //while(game.gameTime > 0){
        //console.log('UserTeam: ' + userTeamHasPuck);
        //console.log('CPUTeam: ' + cpuTeamHasPuck);

        var teamWithPuck = null;

        if(game.userTeamHasPuck){

          game.userTeamHasPuck = false;
          game.cpuTeamHasPuck = false;
          teamWithPuck = game.takeShot(UserTeam, CPUTeam);

        }else if(game.cpuTeamHasPuck){

          game.userTeamHasPuck = false;
          game.cpuTeamHasPuck = false;
          teamWithPuck = game.takeShot(CPUTeam, UserTeam);

        }else{
          game.userTeamHasPuck = false;
          game.cpuTeamHasPuck = false;
          var team = game.faceoff();

          if(team === UserTeam){

            game.printOnceToTicker("Team 1 wins faceoff" + "<br>");
            game.gameTime -= UserTeam.getFaceoffInterval();
            UserTeam.resetAssists();
            teamWithPuck = game.takeShot(UserTeam, CPUTeam);

          }if(team === CPUTeam){

            game.printOnceToTicker("Team 2 wins faceoff" + "<br>");
            game.gameTime -= CPUTeam.getFaceoffInterval();
            CPUTeam.resetAssists();
            teamWithPuck = game.takeShot(CPUTeam, UserTeam);

          }

        }

        if(teamWithPuck != null && teamWithPuck.name === 'UserTeam'){
          console.log('UserTeam');
          game.userTeamHasPuck = true;
          game.cpuTeamHasPuck = false;
        }else if(teamWithPuck != null && teamWithPuck.name === 'CPUTeam'){
          console.log('CPUTeam');
          game.userTeamHasPuck = false;
          game.cpuTeamHasPuck = true;
        }else{
          console.log('neither');
          game.userTeamHasPuck = false;
          game.cpuTeamHasPuck = false;
        }

      //}
      if(game.gameTime > 0){
          console.log('Should the game be running: ' + !game.isPaused);
          setTimeout(function(){game.progressGame(game.userTeamHasPuck, game.cpuTeamHasPuck)}, GAME_PROGRESSION_RATE / GAME_PROGRESSION_RATE_MODIFIER);

      }else{
        $('#lower-half-div').append('Team 1: ' + '\nShot Attempts: ' + UserTeam.shotAttempts + '\nGoals: ' + UserTeam.goals + '\nSaves: ' + UserTeam.saves + "<br>");
        $('#lower-half-div').append('Team 2: ' + '\nShot Attempts: ' + CPUTeam.shotAttempts + '\nGoals: ' + CPUTeam.goals + '\nSaves: ' + CPUTeam.saves + "<br>");
      }
    }




  },

  takeShot: function(oTeam, dTeam){//returns what happens next
    //game.printOnceToTicker("Current time in zone: " + oTeam.timeInZone + "<br>");
    var player = oTeam.getRandomPlayer();
    var shotLocation = player.getShot();
    var shootOrPass = oTeam.shootOrPass(shotLocation, player);

    //HANDLING SHOOTING
    if(shootOrPass === 'Shoot'){
      game.gameTime -= oTeam.getShotInterval();
      var shot = player.shoot(shotLocation) + oTeam.timeInZone;

      player.drainEnergy('shoot');

      if(player.injured){//shot is not as effective if injured

        shot /= 4;

      }

      //HANDLING SHOT BLOCKING
      var playerShotBlock = dTeam.getRandomPlayer();
      if(dTeam.blockShot(playerShotBlock)){

        if(dTeam.gameTickerMessage !== ""){

            game.printOnceToTicker(dTeam.gameTickerMessage + "<br>");
            dTeam.gameTickerMessage = "";
            game.gameTime -= dTeam.getBlockInterval();
            playerShotBlock.drainEnergy('blockShot');

        }


        if(Math.random() <= 0.75){//75% chance the defense gets the blocked shot

          oTeam.resetAssists();
          dTeam.playerLastTouchedPuck = playerShotBlock;
          var playerWithPuck = dTeam.getRandomPlayer();
          dTeam.addToAssist(playerWithPuck)//someone got the blocked shot
          game.printOnceToTicker(playerWithPuck.lastName + ' recovered the puck' + "<br>")
          //game.takeShot(dTeam, oTeam);
          return dTeam;

        }
        else{

          game.printOnceToTicker(oTeam.name + ' got the puck back' + "<br>")
          //game.takeShot(oTeam, dTeam);
          return oTeam;

        }

      }

      //HANDLING TIPPING / SAVING
      else{

        var save = 0;
        var screenPlayer = oTeam.screen();//get screening player

          if (oTeam.gameTickerMessage !== "" && screenPlayer !== null){

            game.printOnceToTicker(oTeam.gameTickerMessage + "<br>");
            oTeam.gameTickerMessage = "";

          }


        if(screenPlayer.tip){

          oTeam.addToAssist(player);
          player = screenPlayer;
          save = dTeam.goalie.makeSave(screenPlayer.shot + screenPlayer.screenNum);//get save or goal from goalie

        }
        else{

          save = dTeam.goalie.makeSave(shot + screenPlayer.screenNum);//get save or goal from goalie

        }
        if(save === true){

          dTeam.saves++;
          oTeam.shots++;
          oTeam.shotAttempts++;
          oTeam.resetAssists();
          game.printOnceToTicker(player.lastName + ' shoots, ' + dTeam.name + ' makes the save' + "<br>");

        }
        if(save === false){

          oTeam.shots++;
          oTeam.goals++;
          oTeam.shotAttempts++;
          oTeam.timeInZone = 0;
          game.printOnceToTicker(oTeam.name +' scores! Goal by ' + player.lastName + '. ' + oTeam.getAssists(player) + "<br>");

        }
        if(save === null){

          oTeam.shotAttempts++;
          game.printOnceToTicker(player.lastName + ' missed the net' + "<br>");

          //see who gets the missed shot, NEEDS MODIFICATION
          if(Math.random() < 0.5){
            return oTeam;
          }else{
            return dTeam;
          }

        }
      }
    }

    //HANDLING PASSING
    if(shootOrPass === 'Pass'){
      game.gameTime -= oTeam.getPassInterval();
      if(Math.random() < player.passing){

          oTeam.timeInZone += 0.05;
          oTeam.addToAssist(player);
          oTeam.playerLastTouchedPuck = player;
          game.printOnceToTicker(player.lastName + ' made a pass' + "<br>");
          player.drainEnergy('pass');
          //game.takeShot(oTeam, dTeam);
          return oTeam;

      }
      else{

        oTeam.timeInZone = 0;
        oTeam.resetAssists();
        game.printOnceToTicker(player.lastName + ' turned it over' + "<br>");
        player.drainEnergy('turnover');
        //game.takeShot(dTeam, oTeam);
        return dTeam;

      }

    }
  }

}
