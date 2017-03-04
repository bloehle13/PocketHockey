var team1 = Object.create(UserTeam);

var GameProgression = {

  gameTime: 60, //60 min
  shots: 0,
  goals: 0,
  saves: 0,

  progressGame: function(){
    while(this.gameTime > 0){
      this.gameTime -= team1.getShotInterval();
      this.takeShot();
    }
    console.log('Shots: ' + this.shots + '\nGoals: ' + this.goals + '\nSaves: ' + this.saves);
  },

  shootOrPass: function(shotLocation){
      if(Math.random() <= shotLocation + team1.offensiveStrategies.shooting){
        return 'Shoot';
      }
      else return 'Pass';
  },

  takeShot: function(){
    console.log(team1.timeInZone);
    var player = team1.getRandomPlayer();
    var shotLocation = player.getShot();
    var shootOrPass = this.shootOrPass(shotLocation);
    if(shootOrPass === 'Shoot'){
      this.shots++;
      var shot = player.shoot(shotLocation) + team1.timeInZone;
      var save = team1.goalie.makeSave(shot);
      if(save === true){
        console.log('SAVE');
        this.saves++;
      }
      else if(save === false){
        console.log('GOAL');
        this.goals++;
      }
      else if(save === null){
        console.log('MISSED THE NET');
      }
    }
    else if(shootOrPass === 'Pass'){
      console.log('PASSSSSSSSSSS');
      this.gameTime -= 0.1;
      if(Math.random() > 0.3){
        team1.timeInZone += 0.05;
        this.takeShot();
      }
      else{
        team1.timeInZone = 0;
      }
    }
  }

}
