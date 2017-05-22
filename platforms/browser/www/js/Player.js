var Player = {
  shotAccuracy: 0.85,
  shotPower: 0.85,
  confidence: 0.5,//between 0.4-0.6
  shotBlocking: 0.5,
  strength: 0.5,
  age: 21,
  speed: 0.5,
  durability: 0.98,
  injured: false,
  faceoffs: 0.5,
  passingShootingDiff: 0, //slider difference, 0 means slider in middle
  height: 73, //in inches
  shoot: function(shotLocation){
    var shotWide = this.missTheNet();
    if(shotWide){
      return 0;
    }
    else{
      if(this.injured){//shot is divided by 2 if injured
        return this.shotAccuracy * this.shotPower * shotLocation * this.confidence / 2;
      }
      else{
        return this.shotAccuracy * this.shotPower * shotLocation * this.confidence;
      }
    }
  },
  getShot: function(){
    var shotLocation = Object.create(Shot);
    return shotLocation.getShotLocation(this);
  },
  missTheNet: function(){
    //30% chance of missing the net
    return Math.random() <= 0.25;
  }
}

//.12 .15 .12
//.22 .3 .22
//.05 .075 .05
