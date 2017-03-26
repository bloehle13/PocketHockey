var goalie = Object.create(Goalie);
var offensiveStrategies = Object.create(OffensiveSliders);
var defensiveStrategies = Object.create(DefensiveSliders);
offensiveStrategies.shooting = 0.5;
offensiveStrategies.passing = 0.5;
offensiveStrategies.screening = 0.5;
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
    getShotInterval: function(){
      //equation returns about 30-45 shot attempts per game on average
      return Math.floor((Math.random() + 0.1) * this.shotInterval / this.momentum);
    },
    getRandomPlayer: function(){
      return this.players[Math.floor(Math.random() * this.players.length)]
    },
    reset: function(){
      this.saves = 0;
      this.timeInZone = 0;
      this.shotAttempts = 0;
      this.goals = 0;
      this.healInjuries();
    },
    screen: function(){
      var screenNum = 0;//by default screening will have no effect
      if(Math.random() < this.offensiveStrategies.screening){
        screenNum = 0.05;
        var player = this.getRandomPlayer();
        var height  = player.height;
        var diffHeight = 73 - height; //73 is average height, and thus the average screening attribute
        screenNum += diffHeight / 100; //add or subtract screen effectiveness given height
        if(this.didScreenWork()){
          console.log(player.lastName + ' screened Goalie with: ' + screenNum);
          return screenNum;
        }
        else{
          console.log(player.lastName + ' falied to screen')
          screenNum = -0.05;
          return screenNum;
        }
      }
      else{
        screenNum = -0.05;
        return screenNum;
      }
    },
    didScreenWork: function(){
      return (Math.random() < 0.5);//50 percent chance to accidently block your own teams shot
    },
    blockShot: function(player){
      if(Math.random() < this.defensiveStrategies.shotBlocking){//team tendancy tp shot block
        if(Math.random() < player.shotBlocking){//player abililty to shot block
           console.log(player.lastName + ' blocked the shot')
           if(Math.random() > player.durability){//if the player got hurt or not
             console.log(player.lastName + ' got injured blocking the shot!');
             this.setInjury(player);
             return true;
           }
        else return false;
        }
      else return false;
      }
    },
    setInjury: function(player){
      for(var i = 0; i < this.players.length; i++){
        if(this.players[i].lastName = player.lastName){
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
