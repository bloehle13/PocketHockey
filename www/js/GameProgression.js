

var GameProgression = {

  gameTime: 60, //60 min
  UserTeamFaceoffs: 0,
  CPUTeamFaceoffs: 0,
  totalFaceoffs: 0,

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
    this.gameTime = 60;
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
      return UserTeam;
    }
    if(player2Faceoff > player1Faceoff){
      this.CPUTeamFaceoffs++;
      this.totalFaceoffs++;
      UserTeam.timeInZone = 0;
      return CPUTeam;
    }
    else this.faceoff();
  },

  progressGame: function(){
    while(this.gameTime > 0){
        if(this.faceoff() === UserTeam){
        this.gameTime -= UserTeam.getShotInterval();
        console.log("Team 1 wins faceoff");
        this.takeShot(UserTeam, CPUTeam);
      }
      if(this.faceoff() === CPUTeam){
        this.gameTime -= CPUTeam.getShotInterval();
        console.log("Team 2 wins faceoff");
        this.takeShot(CPUTeam, UserTeam);
      }
    }
    console.log('Team 1: ' + '\nShot Attempts: ' + UserTeam.shotAttempts + '\nGoals: ' + UserTeam.goals + '\nSaves: ' + UserTeam.saves);
    console.log('Team 2: ' + '\nShot Attempts: ' + CPUTeam.shotAttempts + '\nGoals: ' + CPUTeam.goals + '\nSaves: ' + CPUTeam.saves);

  },

  shootOrPass: function(shotLocation, oTeam){
      if(Math.random() <= shotLocation + oTeam.offensiveStrategies.shooting){
        return 'Shoot';
      }
      else return 'Pass';
  },

  takeShot: function(oTeam, dTeam){
    console.log("Current time in zone: " + oTeam.timeInZone);
    var player = oTeam.getRandomPlayer();
    var shotLocation = player.getShot();
    var shootOrPass = this.shootOrPass(shotLocation, oTeam);
    if(shootOrPass === 'Shoot'){
      var shot = player.shoot(shotLocation) + oTeam.timeInZone;
      var screenNum = oTeam.screen();
      var save = dTeam.goalie.makeSave(shot + screenNum);
      if(save === true){
        if(oTeam.name === 'UserTeam'){
          CPUTeam.saves++;
          UserTeam.shots++;
          UserTeam.shotAttempts++;
          console.log('Team 1 shoots, Team 2 makes the save');
        }
        if(oTeam.name === 'CPUTeam'){
          UserTeam.saves++;
          CPUTeam.shots++;
          CPUTeam.shotAttempts++;
          console.log('Team 2 shoots, Team 1 makes the save');
        }
      }
      if(save === false){
        if(oTeam.name === 'UserTeam'){
          UserTeam.shots++;
          UserTeam.goals++;
          UserTeam.shotAttempts++;
          UserTeam.timeInZone = 0;
          console.log('Team 1 scores');
        }
        if(oTeam.name === 'CPUTeam'){
          CPUTeam.shots++;
          CPUTeam.goals++;
          CPUTeam.shotAttempts++;
          CPUTeam.timeInZone = 0;
          console.log('Team 2 scores');
        }
      }
      if(save === null){
        if(oTeam.name === 'UserTeam'){
          UserTeam.shotAttempts++;
          console.log('Team 1 missed the net');
        }
        if(oTeam.name === 'CPUTeam'){
          CPUTeam.shotAttempts++;
          console.log('Team 2 missed the net');
        }
      }
    }
    if(shootOrPass === 'Pass'){
      this.gameTime -= 0.1;
      if(Math.random() >= 0.5){
        if(oTeam.name === 'UserTeam'){
          UserTeam.timeInZone += 0.05;
          console.log('Team 1 made a pass');
          this.takeShot(UserTeam, CPUTeam);
        }
        if(oTeam.name === 'CPUTeam'){
          CPUTeam.timeInZone += 0.05;
          console.log('Team 2 made a pass');
          this.takeShot(CPUTeam, UserTeam);
        }
      }
      else{
        if(oTeam.name === 'UserTeam'){
          UserTeam.timeInZone = 0;
          console.log('Team 1 turned it over');
          this.takeShot(CPUTeam, UserTeam);
        }
        if(oTeam.name === 'CPUTeam'){
          CPUTeam.timeInZone = 0;
          console.log('Team 2 turned it over');
          this.takeShot(UserTeam, CPUTeam);
        }
      }
    }
  }

}
