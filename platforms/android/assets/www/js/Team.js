var goalie = Object.create(Goalie);
var offensiveStrategies = Object.create(OffensiveSliders);
var defensiveStrategies = Object.create(DefensiveSliders);
offensiveStrategies.shooting = 0.5;
offensiveStrategies.passing = 0.5;
offensiveStrategies.screening = 0.5;
offensiveStrategies.tipping = 0.5;
offensiveStrategies.aggresiveness = 0.5;
defensiveStrategies.shotBlocking = 0.5;

var Team = {

    momentum: 1,
    shotInterval: 3,//range of minutes between shots
    goalie: goalie,
    offensiveStrategies: offensiveStrategies,
    defensiveStrategies: defensiveStrategies,
    timeInZone: 0,
    saves: 0,
    shotAttempts: 0,
    goals: 0,
    name: 'N/A',
    assistPlayers: [null, null],
    playerLastTouchedPuck: null,
    getShotInterval: function(){
      //equation returns about 30-45 shot attempts per game on average
      return Math.floor(60*(Math.random() + 0.1) * this.shotInterval / this.momentum);
    },
    getRandomPlayer: function(){//gets a random player who is NOT the one who just had the puck
      var index = Math.floor(Math.random() * this.players.length);
      if(this.players[index] === this.playerLastTouchedPuck){
        if(index < this.players.length - 1){//avoid index out of bounds error
          return this.players[index+1];
        }
        else{
          return this.players[index-1];
        }
      }
      else{
        return this.players[index];
      }
    },
    reset: function(){
      this.saves = 0;
      this.timeInZone = 0;
      this.shotAttempts = 0;
      this.goals = 0;
      this.healInjuries();
    },
    shootOrPass: function(shotLocation){
        if(Math.random()*2 <= shotLocation + this.offensiveStrategies.shooting){
          return 'Shoot';
        }
        else{
          return 'Pass';
        }
    },
    addToAssist: function(player){
      this.assistPlayers[1] = this.assistPlayers[0];
      this.assistPlayers[0] = player;
    },
    resetAssists: function(){
      this.assistPlayers[0] = null;
      this.assistPlayers[1] = null;
    },
    getAssists: function(playerWhoScored){
      var assists = ' ';
      if(this.assistPlayers[0] !== null && this.assistPlayers[0] !== playerWhoScored){
        assists = 'Assists by ';
        assists += this.assistPlayers[0].lastName;
      }
      if(this.assistPlayers[1] !== null && this.assistPlayers[0] !== playerWhoScored){
        assists += ' and ';
        assists += this.assistPlayers[1].lastName;
      }
      return assists;
    },
    screen: function(){
      var player = this.getRandomPlayer();
      var screenPlayer = {
        lastName: player.lastName,
        handEye: player.handEye,
        height: player.height,
        screenNum: 0,
        shot: 0,
        tip: false
      };//by default screening will have no effect
      if(Math.random() < this.offensiveStrategies.screening){
        screenPlayer.screenNum = 0.05;
        var height  = screenPlayer.height;
        var diffHeight = 73 - height; //73 is average height, and thus the average screening attribute
        screenPlayer.screenNum += diffHeight / 100; //add or subtract screen effectiveness given height
        if(this.didScreenWork()){
          $('#lower-half-div').append("<br>" + GameProgression.getGameClock() + " - " + screenPlayer.lastName + ' screened Goalie with: ' + screenPlayer.screenNum);
          if(Math.random() < this.offensiveStrategies.tipping){//did the player tip the puck?
            if(Math.random() < screenPlayer.handEye){//how successful was the tip?
              screenPlayer.tip = true;
              screenPlayer.shot = Math.random() * screenPlayer.handEye/2;
              $('#lower-half-div').append("<br>" + GameProgression.getGameClock() + " - " + screenPlayer.lastName + ' tipped the puck with ' + screenPlayer.shot);
              return screenPlayer;
            }
          }
          return screenPlayer;
        }
        else{
          $('#lower-half-div').append("<br>" + GameProgression.getGameClock() + " - " + player.lastName + ' falied to screen')
          screenPlayer.screenNum = -0.05;
          return screenPlayer;
        }
      }
      else{
        screenPlayer.screenNum = -0.05;
        return screenPlayer;
      }
    },
    didScreenWork: function(){
      return (Math.random() < 0.5);//50 percent chance to accidently block your own teams shot
    },
    blockShot: function(player){
      if(Math.random() < this.defensiveStrategies.shotBlocking){//team tendancy tp shot block
        if(Math.random() < player.shotBlocking){//player abililty to shot block
           $('#lower-half-div').append("<br>" + GameProgression.getGameClock() + " - " + player.lastName + ' blocked the shot')
           if(Math.random() > player.durability){//if the player got hurt or not
             $('#lower-half-div').append("<br>" + GameProgression.getGameClock() + " - " + player.lastName + ' got injured blocking the shot!');
             this.setInjury(player.lastName);
             return true;
           }
        else return false;
        }
      else return false;
      }
    },
    setInjury: function(injuredName){
      for(var i = 0; i < this.players.length; i++){
        if(this.players[i].lastName === injuredName){
          this.players[i].injured = true;
        }
      }
    },
    healInjuries: function(){
      for(var i = 0; i < this.players.length; i++){
        this.players[i].injured = false;
      }
    }
}
