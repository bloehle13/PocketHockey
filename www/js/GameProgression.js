

var GameProgression = {

  gameTime: 3600, //60 min
  UserTeamFaceoffs: 0,
  CPUTeamFaceoffs: 0,
  totalFaceoffs: 0,

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
        $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + "Team 1 wins faceoff");
        this.gameTime -= UserTeam.getShotInterval();
        UserTeam.resetAssists();
        this.takeShot(UserTeam, CPUTeam);
      }
      if(this.faceoff() === CPUTeam){
        $('#lower-half-div').append("<br>"  + this.getGameClock() + " - " + "Team 2 wins faceoff");
        this.gameTime -= CPUTeam.getShotInterval();
        CPUTeam.resetAssists();
        this.takeShot(CPUTeam, UserTeam);
      }
    }
    $('#lower-half-div').append('<br>Team 1: ' + '\nShot Attempts: ' + UserTeam.shotAttempts + '\nGoals: ' + UserTeam.goals + '\nSaves: ' + UserTeam.saves);
    $('#lower-half-div').append('<br>Team 2: ' + '\nShot Attempts: ' + CPUTeam.shotAttempts + '\nGoals: ' + CPUTeam.goals + '\nSaves: ' + CPUTeam.saves);

  },

  takeShot: function(oTeam, dTeam){
    $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + "Current time in zone: " + oTeam.timeInZone);
    var player = oTeam.getRandomPlayer();
    var shotLocation = player.getShot();
    var shootOrPass = oTeam.shootOrPass(shotLocation, player);

    //HANDLING SHOOTING
    if(shootOrPass === 'Shoot'){
      var shot = player.shoot(shotLocation) + oTeam.timeInZone;
      if(player.injured){//shot is not as effective if injured
        shot /= 4;
      }

      //HANDLING SHOT BLOCKING
      var playerShotBlock = dTeam.getRandomPlayer();
      if(dTeam.blockShot(playerShotBlock)){
        if(oTeam.name === 'UserTeam'){
          if(Math.random() <= 0.75){//75% chance the defense gets the blocked shot
            UserTeam.resetAssists();
            CPUTeam.playerLastTouchedPuck = playerShotBlock;
            var playerWithPuck = CPUTeam.getRandomPlayer();
            CPUTeam.addToAssist(playerWithPuck)//someone got the blocked shot
            $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + playerWithPuck.lastName + ' recovered the puck')
            this.takeShot(dTeam, oTeam);
          }
          else{
            $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + oTeam.name + ' got the puck back')
            this.takeShot(oTeam, dTeam);
          }
        }
        if(oTeam.name === 'CPUTeam'){
          if(Math.random() <= 0.75){//75% chance the defense gets the blocked shot
            CPUTeam.resetAssists();
            UserTeam.playerLastTouchedPuck = playerShotBlock;
            var playerWithPuck = UserTeam.getRandomPlayer();
            UserTeam.addToAssist(playerWithPuck)//someone got the blocked shot
            $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + playerWithPuck.lastName + ' recovered the puck')
            this.takeShot(dTeam, oTeam);
          }
          else{
            $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + oTeam.name + ' got the puck back')
            this.takeShot(oTeam, dTeam);
          }
        }
      }

      //HANDLING TIPPING / SAVING
      else{
        var save = 0;
        var screenPlayer = oTeam.screen();//get screening player
        if(screenPlayer.tip){
          if(oTeam.name === 'UserTeam'){
            UserTeam.addToAssist(player);
          }
          if(oTeam.name === 'CPUTeam'){
            CPUTeam.addToAssist(player);
          }
          player = screenPlayer;
          save = dTeam.goalie.makeSave(screenPlayer.shot + screenPlayer.screenNum);//get save or goal from goalie
        }
        else{
          save = dTeam.goalie.makeSave(shot + screenPlayer.screenNum);//get save or goal from goalie
        }
        if(save === true){
          if(oTeam.name === 'UserTeam'){
            CPUTeam.saves++;
            UserTeam.shots++;
            UserTeam.shotAttempts++;
            UserTeam.resetAssists();
            $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + player.lastName + ' shoots, Team 2 makes the save');
          }
          if(oTeam.name === 'CPUTeam'){
            UserTeam.saves++;
            CPUTeam.shots++;
            CPUTeam.shotAttempts++;
            CPUTeam.resetAssists();
            $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + player.lastName + ' shoots, Team 1 makes the save');
          }
        }
        if(save === false){
          if(oTeam.name === 'UserTeam'){
            UserTeam.shots++;
            UserTeam.goals++;
            UserTeam.shotAttempts++;
            UserTeam.timeInZone = 0;
            $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + '\n\n\nTeam 1 scores! Goal by ' + player.lastName + '. ' + UserTeam.getAssists(player));
          }
          if(oTeam.name === 'CPUTeam'){
            CPUTeam.shots++;
            CPUTeam.goals++;
            CPUTeam.shotAttempts++;
            CPUTeam.timeInZone = 0;
            $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + '\n\n\nTeam 2 score! Goal by ' + player.lastName + ' ' + CPUTeam.getAssists(player));
          }
        }
        if(save === null){
          if(oTeam.name === 'UserTeam'){
            UserTeam.shotAttempts++;
            $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + player.lastName + ' missed the net');
          }
          if(oTeam.name === 'CPUTeam'){
            CPUTeam.shotAttempts++;
            $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + player.lastName + ' missed the net');
          }
        }
      }
    }

    //HANDLING PASSING
    if(shootOrPass === 'Pass'){
      this.gameTime -= 0.1;
      if(Math.random() < player.passing){
        if(oTeam.name === 'UserTeam'){
          UserTeam.timeInZone += 0.05;
          UserTeam.addToAssist(player);
          UserTeam.playerLastTouchedPuck = player;
          $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + player.lastName + ' made a pass');
          this.takeShot(UserTeam, CPUTeam);
        }
        if(oTeam.name === 'CPUTeam'){
          CPUTeam.timeInZone += 0.05;
          CPUTeam.addToAssist(player);
          CPUTeam.playerLastTouchedPuck = player;
          $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + player.lastName + ' made a pass');
          this.takeShot(CPUTeam, UserTeam);
        }
      }
      else{
        if(oTeam.name === 'UserTeam'){
          UserTeam.timeInZone = 0;
          UserTeam.resetAssists();
          $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + player.lastName + ' turned it over');
          this.takeShot(CPUTeam, UserTeam);
        }
        if(oTeam.name === 'CPUTeam'){
          CPUTeam.timeInZone = 0;
          CPUTeam.resetAssists();
          $('#lower-half-div').append("<br>" + this.getGameClock() + " - " + player.lastName + ' turned it over');
          this.takeShot(UserTeam, CPUTeam);
        }
      }
    }
  }

}
