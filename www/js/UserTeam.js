var fwd1 = Object.create(Forward);
var fwd2 = Object.create(Forward);
var fwd3 = Object.create(Forward);
var dman1 = Object.create(Defender);
var dman2 = Object.create(Defender);
var goalie = Object.create(Goalie);
var offensiveStrategies = Object.create(OffensiveSliders);
offensiveStrategies.shooting = 0.1;
offensiveStrategies.passing = 0.9;


var UserTeam = {

  momentum: 1,
  shotInterval: 3,//range of minutes between shots
  players: [fwd1, fwd2, fwd3, dman1, dman2],
  goalie: goalie,
  offensiveStrategies: offensiveStrategies,
  timeInZone: 0,
  getShotInterval: function(){
    //equation returns about 30-45 shot attempts per game on average
    return Math.floor((Math.random() + 0.1) * this.shotInterval / this.momentum);
  },
  getRandomPlayer: function(){
    return this.players[Math.floor(Math.random() * this.players.length)]
  }
}
