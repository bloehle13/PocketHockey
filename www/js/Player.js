var Player = {
  shotAccuracy: 0.85,
  shotPower: 0.85,
  confidence: 0.5,//between 0.4-0.6
  type: "",
  faceoffs: 0.5,
  passingShootingDiff: 0, //slider difference, 0 means slider in middle
  shoot: function(shotLocation){
    var shotWide = this.missTheNet();
    if(shotWide){
      return 0;
    }
    else{
      return this.shotAccuracy * this.shotPower * shotLocation * this.confidence;
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
