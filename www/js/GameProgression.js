//STATIC VARIABLES DECLARATION
var GAME_PROGRESSION_RATE = 1000;//in ms

var GameProgression = {

  gameTime: 3600, //60 min
  UserTeamFaceoffs: 0,
  CPUTeamFaceoffs: 0,
  totalFaceoffs: 0,
  messages: [],

  addToMessageQueue: function(message){//adds to array of messages to be printed to ticker
    if(this.getGameClock().indexOf('-') === -1){//prevents printing out a negative time
      this.messages.push(this.getGameClock() + ' - ' + message);
    }
  },

  printToTicker: function(messages){//takes a message and formats it to be posted to the ticker
    console.log(messages.length);
      $('#lower-half-div').append(messages.shift());

      if(messages.length > 0){
        setTimeout(function(){GameProgression.printToTicker(messages)}, GAME_PROGRESSION_RATE);
      }

  },

  getGameClock: function(){//formats a clock feel to the current game time
    var min = Math.floor(this.gameTime / 60);
    var formatedMin = ("0" + min).slice(-2);
    var sec = Math.floor(this.gameTime % 60);
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
    this.gameTime = 3600;
  },

  faceoff: function(){
    var player1 = UserTeam.getRandomPlayer();
    var player2 = CPUTeam.getRandomPlayer();
    var player1Faceoff = Math.random() * player1.faceoffs;
    var player2Faceoff = Math.random() * player2.faceoffs;

    if(player1Faceoff > player2Faceoff){

      this.UserTeamFaceoffs++;
      this.totalFaceoffs++;
      CPUTeam.timeInZone = 0;
      CPUTeam.resetAssists();
      UserTeam.addToAssist(player1);
      return UserTeam;

    }
    if(player2Faceoff > player1Faceoff){

      this.CPUTeamFaceoffs++;
      this.totalFaceoffs++;
      UserTeam.timeInZone = 0;
      UserTeam.resetAssists();
      CPUTeam.addToAssist(player2);
      return CPUTeam;

    }

    else this.faceoff();
  },

  progressGame: function(){
    while(this.gameTime > 0){

      if(this.faceoff() === UserTeam){

        this.addToMessageQueue("Team 1 wins faceoff" + "<br>");
        this.gameTime -= UserTeam.getFaceoffInterval();
        UserTeam.resetAssists();
        this.takeShot(UserTeam, CPUTeam);

      }
      if(this.faceoff() === CPUTeam){

        this.addToMessageQueue("Team 2 wins faceoff" + "<br>");
        this.gameTime -= CPUTeam.getFaceoffInterval();
        CPUTeam.resetAssists();
        this.takeShot(CPUTeam, UserTeam);

      }

    }

    $('#lower-half-div').append('Team 1: ' + '\nShot Attempts: ' + UserTeam.shotAttempts + '\nGoals: ' + UserTeam.goals + '\nSaves: ' + UserTeam.saves + "<br>");
    $('#lower-half-div').append('Team 2: ' + '\nShot Attempts: ' + CPUTeam.shotAttempts + '\nGoals: ' + CPUTeam.goals + '\nSaves: ' + CPUTeam.saves + "<br>");

  },

  takeShot: function(oTeam, dTeam){
    //this.addToMessageQueue("Current time in zone: " + oTeam.timeInZone + "<br>");
    var player = oTeam.getRandomPlayer();
    var shotLocation = player.getShot();
    var shootOrPass = oTeam.shootOrPass(shotLocation, player);

    //HANDLING SHOOTING
    if(shootOrPass === 'Shoot'){
      this.gameTime -= oTeam.getShotInterval();
      var shot = player.shoot(shotLocation) + oTeam.timeInZone;

      player.drainEnergy('shoot');

      if(player.injured){//shot is not as effective if injured

        shot /= 4;

      }

      //HANDLING SHOT BLOCKING
      var playerShotBlock = dTeam.getRandomPlayer();
      if(dTeam.blockShot(playerShotBlock)){

        if(dTeam.gameTickerMessage !== ""){

            this.addToMessageQueue(dTeam.gameTickerMessage + "<br>");
            dTeam.gameTickerMessage = "";
            this.gameTime -= dTeam.getBlockInterval();
            playerShotBlock.drainEnergy('blockShot');

        }


        if(Math.random() <= 0.75){//75% chance the defense gets the blocked shot

          oTeam.resetAssists();
          dTeam.playerLastTouchedPuck = playerShotBlock;
          var playerWithPuck = dTeam.getRandomPlayer();
          dTeam.addToAssist(playerWithPuck)//someone got the blocked shot
          this.addToMessageQueue(playerWithPuck.lastName + ' recovered the puck' + "<br>")
          this.takeShot(dTeam, oTeam);

        }
        else{

          this.addToMessageQueue(oTeam.name + ' got the puck back' + "<br>")
          this.takeShot(oTeam, dTeam);

        }

      }

      //HANDLING TIPPING / SAVING
      else{

        var save = 0;
        var screenPlayer = oTeam.screen();//get screening player

          if (oTeam.gameTickerMessage !== "" && screenPlayer !== null){

            this.addToMessageQueue(oTeam.gameTickerMessage + "<br>");
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
          this.addToMessageQueue(player.lastName + ' shoots, ' + dTeam.name + ' makes the save' + "<br>");

        }
        if(save === false){

          oTeam.shots++;
          oTeam.goals++;
          oTeam.shotAttempts++;
          oTeam.timeInZone = 0;
          this.addToMessageQueue(oTeam.name +' scores! Goal by ' + player.lastName + '. ' + oTeam.getAssists(player) + "<br>");

        }
        if(save === null){

          oTeam.shotAttempts++;
          this.addToMessageQueue(player.lastName + ' missed the net' + "<br>");

        }
      }
    }

    //HANDLING PASSING
    if(shootOrPass === 'Pass'){
      this.gameTime -= oTeam.getPassInterval();
      if(Math.random() < player.passing){

          oTeam.timeInZone += 0.05;
          oTeam.addToAssist(player);
          oTeam.playerLastTouchedPuck = player;
          this.addToMessageQueue(player.lastName + ' made a pass' + "<br>");
          player.drainEnergy('pass');
          this.takeShot(oTeam, dTeam);

      }
      else{

        oTeam.timeInZone = 0;
        oTeam.resetAssists();
        this.addToMessageQueue(player.lastName + ' turned it over' + "<br>");
        player.drainEnergy('turnover');
        this.takeShot(dTeam, oTeam);

      }

    }
  }

}
