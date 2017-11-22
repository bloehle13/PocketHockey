var CPUTeam = Object.create(Team);
CPUTeam.offensiveStrategies = Object.create(OffensiveSliders),
CPUTeam.defensiveStrategies = Object.create(DefensiveSliders),
CPUTeam.name = 'CPUTeam';
CPUTeam.players = [test6, test7, test8, test9, test10];
CPUTeam.allPlayers = CPUTeam.players;
CPUTeam.adaptability = 10;//every 10 game progressions, CPUTeam.adapt() is called
CPUTeam.adaptNum = 0;//increment this once every game progression

//ALL ADAPTION THRESHOLDS
CPUTeam.shotThreshold = 0;//to be calculated in this.init()
CPUTeam.tipThreshold = 0.2; //20% of tips should go in
CPUTeam.missedShotThreshold = 0.2//20% is highest rate of missed shots allowed
CPUTeam.injuredThreshold = 2;//2 is the most allowed injured players

/*MAIN AI ADAPTION FOR THE COMPUTER TEAM*/
CPUTeam.adapt = function(){

  this.adaptNum++;

  if(this.adaptNum >= this.adaptability){//time to adapt the strats!

    this.adaptNum = 0;//reset counter

    if(this.shots > 0){
      this.adaptShot();
      this.adaptShotPercentage();
      this.adaptMissedShots();
    }

    if(this.tips > 0){
      this.adaptTipPercentage();
    }

    this.adaptTurnover();
    this.adaptScore();
    this.adaptInjuries();

    this.checkStrategyBounds();
    console.log(CPUTeam);
    console.log(UserTeam);

  }
}

/*Ensures strategy value [0-1]*/
CPUTeam.checkStrategyBounds = function(){

  var key;
  for (key in CPUTeam.offensiveStrategies) {
      if (CPUTeam.offensiveStrategies.hasOwnProperty(key)) {
          var value = CPUTeam.offensiveStrategies[key];

          if(value < 0){
            CPUTeam.offensiveStrategies[key] = 0.15;
          }else if(value > 1){
            CPUTeam.offensiveStrategies[key] = 0.85;
          }

          console.log(key + ": " + CPUTeam.offensiveStrategies[key])
      }
  }

  for (key in CPUTeam.defensiveStrategies) {
      if (CPUTeam.defensiveStrategies.hasOwnProperty(key)) {
          var value = CPUTeam.defensiveStrategies[key];

          if(value < 0){
            CPUTeam.defensiveStrategies[key] = 0.15;
          }else if(value > 1){
            CPUTeam.defensiveStrategies[key] = 0.85;
          }

          console.log(key + ": " + CPUTeam.defensiveStrategies[key])
      }
  }

}

/*Prevents Math.log10(criteria) from returning infinity if criteria is 0*/
CPUTeam.checkCriteria = function(criteria){
  if(criteria === 0){
    return 1;
  }else{
    return criteria;
  }
}

/*Adapts based on injuries*/
CPUTeam.adaptInjuries = function(){

  var criteria = Math.abs(this.numInjured - this.injuredThreshold);
  criteria = CPUTeam.checkCriteria(criteria);

  var adjustment = Math.random() * Math.abs(Math.log10(criteria)) / 20 + this.getDesperation();
  console.log('Injury adjust: ' + adjustment);

  if(this.numInjured > this.injuredThreshold){
      CPUTeam.defensiveStrategies.shotBlocking -= adjustment;
  }
}

/*Adapts based on missed shots*/
CPUTeam.adaptMissedShots = function(){

  var criteria = Math.abs((this.missedShots / this.shots) - this.missedShotThreshold)
  criteria = CPUTeam.checkCriteria(criteria);

  var adjustment = Math.random() * Math.abs(Math.log10(criteria)) / 20 + this.getDesperation();
    console.log('Missed shots adjust: ' + adjustment);

  if((this.missedShots / this.shots) > this.missedShotThreshold){
    CPUTeam.offensiveStrategies.shooting -= adjustment;
    CPUTeam.offensiveStrategies.passing += adjustment;

  }else{
    CPUTeam.offensiveStrategies.shooting += adjustment;
    CPUTeam.offensiveStrategies.passing += adjustment;

  }
}

/*Adapts based on current score*/
CPUTeam.adaptScore = function(){

  var criteria = Math.abs(this.goals + 2 - UserTeam.goals);
  criteria = CPUTeam.checkCriteria(criteria);

  var adjustment = Math.random() * Math.abs(Math.log10(criteria)) / 20 + this.getDesperation();
    console.log('Score adjust: ' + adjustment);

  if(this.goals + 2 <= UserTeam.goals){//down by 2 or more
    CPUTeam.offensiveStrategies.shooting += adjustment;
    CPUTeam.offensiveStrategies.passing += adjustment;

    CPUTeam.defensiveStrategies.shotBlocking += adjustment;

  }else if(this.goals + 2 > UserTeam.goals){//up by more than 2
    CPUTeam.offensiveStrategies.shooting -= adjustment;
    //CPUTeam.offensiveStrategies.passing -= adjustment;
    CPUTeam.offensiveStrategies.screening += adjustment;
    CPUTeam.offensiveStrategies.tipping += adjustment;

    CPUTeam.defensiveStrategies.shotBlocking -= adjustment;

  }
}

/*Adapts based on tip percentage*/
CPUTeam.adaptTipPercentage = function(){

  var criteria = Math.abs((this.tipGoals / this.tips) - this.tipThreshold);
  criteria = CPUTeam.checkCriteria(criteria);

  var adjustment = Math.random() * Math.abs(Math.log10(criteria)) / 20 + this.getDesperation();
    console.log('Tip adjust: ' + adjustment);

  if((this.tipGoals / this.tips) < this.tipThreshold){//tipping percentage is too low
    CPUTeam.offensiveStrategies.passing += adjustment;
    CPUTeam.offensiveStrategies.screening -= adjustment;
    CPUTeam.offensiveStrategies.tipping -= adjustment;

  }else{
    CPUTeam.offensiveStrategies.passing -= adjustment;

  }
}

/*Adapts based on shot percentage*/
CPUTeam.adaptShotPercentage = function(){

  var criteria = Math.abs((this.goals / this.shots) - this.shotThreshold);
  criteria = CPUTeam.checkCriteria(criteria);

  var adjustment = Math.random() * Math.abs(Math.log10(criteria)) / 20 + this.getDesperation();
    console.log('Shot % adjust: ' + adjustment);

  if((this.goals / this.shots) < this.shotThreshold){//shooting percentage is too low
    CPUTeam.offensiveStrategies.screening += adjustment;
    CPUTeam.offensiveStrategies.tipping += adjustment;
    CPUTeam.offensiveStrategies.shooting -= adjustment;

  }else{
    CPUTeam.offensiveStrategies.screening -= adjustment;
    CPUTeam.offensiveStrategies.tipping -= adjustment;
    CPUTeam.offensiveStrategies.shooting += adjustment;

  }
}

/*Adapts based on turnover rate*/
CPUTeam.adaptTurnover = function(){

  var criteria = Math.abs(this.turnovers - UserTeam.turnovers);
  criteria = CPUTeam.checkCriteria(criteria);

  var adjustment = Math.random() * Math.abs(Math.log10(criteria)) / 20 + this.getDesperation();
  console.log('Turnover adjust: ' + adjustment);

  if(this.turnovers >= UserTeam.turnovers){
    CPUTeam.offensiveStrategies.passing -= adjustment;

  }else{
    CPUTeam.offensiveStrategies.passing += adjustment;

  }
}

/*Adapts based on total shots*/
CPUTeam.adaptShot = function(){

  var criteria = Math.abs(this.shots - UserTeam.shots);
  criteria = CPUTeam.checkCriteria(criteria);

  var adjustment = Math.random() * Math.abs(Math.log10(criteria)) / 20 + this.getDesperation();
  console.log('Shot adjust: ' + adjustment);

  if(this.shots <= UserTeam.shots){
    CPUTeam.offensiveStrategies.shooting += adjustment;
    CPUTeam.offensiveStrategies.passing -= adjustment;

    CPUTeam.defensiveStrategies.shotBlocking += adjustment;

  }else{
    //CPUTeam.offensiveStrategies.shooting -= adjustment;
    CPUTeam.offensiveStrategies.passing += adjustment;
    CPUTeam.offensiveStrategies.screening -= adjustment;
    CPUTeam.offensiveStrategies.tipping -= adjustment;

    //CPUTeam.defensiveStrategies.shotBlocking -= adjustment;

  }
}

/*% of game remaining (seconds) x 15, returns values (0-15)*/
CPUTeam.getDesperation = function(){
    //console.log((1 - (game.gameTime / 3600)) / 10);
    return (1 - (game.gameTime / 3600)) / 50;
}

/*Based on averages of all players shot, determine what a worrisome shot % would be*/
CPUTeam.getShotThreshold = function(){
  var shotPercentage = 0;

  for(var i = 0; i < this.allPlayers.length; i++){
    shotPercentage += this.allPlayers[i].shotAccuracy + this.allPlayers[i].shotPower;
  }

  CPUTeam.shotThreshold = 1 - (shotPercentage / (this.allPlayers.length * 2));//since we took 2 attributes from each
}

CPUTeam.init = function(){
  this.getShotThreshold();
}
