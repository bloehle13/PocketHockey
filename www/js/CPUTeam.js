var fwd1 = Object.create(Forward);
var fwd2 = Object.create(Forward);
var fwd3 = Object.create(Forward);
var dman1 = Object.create(Defender);
var dman2 = Object.create(Defender);
var goalie = Object.create(Goalie);
var offensiveStrategies = Object.create(OffensiveSliders);
offensiveStrategies.shooting = 0.5;
offensiveStrategies.passing = 0.5;
offensiveStrategies.screening = 0.5;


var CPUTeam = {

  momentum: 1,
  shotInterval: 3,//range of minutes between shots
  players: [fwd1, fwd2, fwd3, dman1, dman2],
  goalie: goalie,
  offensiveStrategies: offensiveStrategies,
  timeInZone: 0,
  saves: 0,
  shotAttempts: 0,
  goals: 0,
  name: 'CPUTeam',
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
  },
  screen: function(){
    var screenNum = 0;//by default screening will have no effect
    if(Math.random() < this.offensiveStrategies.screening){
      screenNum = 0.05;
      var height  = this.getRandomPlayer().height;
      var diffHeight = 73 - height; //73 is average height, and thus the average screening attribute
      screenNum += diffHeight / 100; //add or subtract screen effectiveness given height
      if(this.didScreenWork()){
        console.log('Screened Goalie with: ' + screenNum);
        return screenNum;
      }
      else{
        console.log('Screen attempt failed')
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
  }
}
