

var Team = {

    momentum: 1,
    shotInterval: 2,//range of minutes between shots
    goalie: Object.create(Goalie),
    gameTickerMessage: "",
    timeInZone: 0,
    saves: 0,
    shotAttempts: 0,
    goals: 0,
    name: 'N/A',
    assistPlayers: [null, null],
    playerLastTouchedPuck: null,
    getBlockInterval: function(){
      return (Math.random() * (10 - this.offensiveStrategies.aggresiveness));
    },
    getFaceoffInterval: function(){
      return (Math.random() * 5);
    },
    getPassInterval: function(){
      return (20 * Math.random() * this.offensiveStrategies.passing);
    },
    getShotInterval: function(){
      //equation returns about 30-45 shot attempts per game on average
      return (20 * (Math.random() + 0.1) * this.shotInterval / this.momentum);
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
      if(this.assistPlayers[0] !== null && this.assistPlayers[0].lastName !== playerWhoScored.lastName){
        assists = 'Assists by ';
        assists += this.assistPlayers[0].lastName;
      }
      if(this.assistPlayers[1] !== null && this.assistPlayers[0].lastName !== playerWhoScored.lastName){
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
        screenPlayer.screenNum += Math.abs(diffHeight) / 100 * player.energy; //add or subtract screen effectiveness given height
        player.drainEnergy('screen');
        if(this.didScreenWork()){
          this.gameTickerMessage += (screenPlayer.lastName + ' screened Goalie with: ' + screenPlayer.screenNum);
          if(Math.random() < this.offensiveStrategies.tipping){//did the player tip the puck?
            if(Math.random() < screenPlayer.handEye){//how successful was the tip?
              player.drainEnergy('tip');
              screenPlayer.tip = true;
              screenPlayer.shot = Math.random() * screenPlayer.handEye/2 * player.energy;
              this.gameTickerMessage += (screenPlayer.lastName + ' tipped the puck with ' + screenPlayer.shot);
              return screenPlayer;
            }
          }
          return screenPlayer;
        }
        else{
          this.gameTickerMessage += (player.lastName + ' falied to screen')
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
        if(Math.random() < player.shotBlocking * player.energy){//player abililty to shot block
           this.gameTickerMessage += (player.lastName + ' blocked the shot')
           if(Math.random() > player.durability * player.energy/2){//if the player got hurt or not
             this.gameTickerMessage += (' and got injured as a result');
             this.setInjury(player.lastName);
             return true;
           }
           else return true;
        }
        else return false;
      }
      else return false;
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
