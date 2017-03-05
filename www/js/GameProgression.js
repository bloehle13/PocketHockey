var team1 = Object.create(UserTeam);
var team2 = Object.create(CPUTeam);

var GameProgression = {

  gameTime: 60, //60 min
  shots: 0,
  goals: 0,
  saves: 0,

  reset: function(){
    team1.reset();
    team2.reset();
  },

  faceoff: function(){
    var player1 = team1.getRandomPlayer();
    var player2 = team2.getRandomPlayer();
    var player1Faceoff = Math.random() * player1.faceoffs;
    var player2Faceoff = Math.random() * player2.faceoffs;
    if(player1Faceoff >= player2Faceoff){
      return team1;
    }
    else return team2;
  },

  progressGame: function(){
    while(this.gameTime > 0){
      if(this.faceoff() === team1){
        this.gameTime -= team1.getShotInterval();
        console.log("Team 1 wins faceoff");
        this.takeShot(team1, team2);
      }
      else if(this.faceoff() === team2){
        this.gameTime -= team2.getShotInterval();
        console.log("Team 2 wins faceoff");
        this.takeShot(team2, team1);
      }
    }
    console.log('Team 1: ' + '\nShot Attempts: ' + team1.shotAttempts + '\nGoals: ' + team1.goals + '\nSaves: ' + team1.saves);
    console.log('Team 2: ' + '\nShot Attempts: ' + team2.shotAttempts + '\nGoals: ' + team2.goals + '\nSaves: ' + team2.saves);

  },

  shootOrPass: function(shotLocation){
      if(Math.random() <= shotLocation + team1.offensiveStrategies.shooting){
        return 'Shoot';
      }
      else return 'Pass';
  },

  takeShot: function(oTeam, dTeam){
    console.log("Current time in zone: " + oTeam.timeInZone);
    var player = oTeam.getRandomPlayer();
    var shotLocation = player.getShot();
    var shootOrPass = this.shootOrPass(shotLocation);
    if(shootOrPass === 'Shoot'){
      var shot = player.shoot(shotLocation) + oTeam.timeInZone;
      var save = dTeam.goalie.makeSave(shot);
      if(save === true){
        if(oTeam.name === 'UserTeam'){
          team2.saves++;
          team1.shots++;
          team1.shotAttempts++;
          console.log('Team 1 shoots, Team 2 makes the save');
        }
        else if(oTeam.name === 'CPUTeam'){
          team1.saves++;
          team2.shots++;
          team2.shotAttempts++;
          console.log('Team 2 shoots, Team 1 makes the save');
        }
      }
      else if(save === false){
        if(oTeam.name === 'UserTeam'){
          team1.shots++;
          team1.goals++;
          team1.shotAttempts++;
          console.log('Team 1 scores');
        }
        else if(oTeam.name === 'CPUTeam'){
          team2.shots++;
          team2.goals++;
          team2.shotAttempts++;
          console.log('Team 2 scores');
        }
      }
      else if(save === null){
        if(oTeam.name === 'UserTeam'){
          team1.shotAttempts++;
          console.log('Team 1 missed the net');
        }
        else if(oTeam.name === 'CPUTeam'){
          team2.shotAttempts++;
          console.log('Team 2 missed the net');
        }
      }
    }
    else if(shootOrPass === 'Pass'){
      this.gameTime -= 0.1;
      if(Math.random() > 0.5){
        if(oTeam.name === 'UserTeam'){
          team1.timeInZone += 0.05;
          console.log('Team 1 made a pass');
          this.takeShot(team1, team2);
        }
        else if(oTeam.name === 'CPUTeam'){
          team2.timeInZone += 0.05;
          this.takeShot(team2, team1);
          console.log('Team 2 made a pass');
        }
      }
      else{
        if(oTeam.name === 'UserTeam'){
          team1.timeInZone = 0;
          console.log('Team 1 turned it over');
          this.takeShot(team2, team1);
        }
        else if(oTeam.name === 'CPUTeam'){
          team2.timeInZone = 0;
          console.log('Team 2 turned it over');
          this.takeShot(team1, team2);
        }
      }
    }
  }

}
