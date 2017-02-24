var Player = {
  shotAccuracy: 0.5,
  shotPower: 0.5,
  confidence: 0.5,//between 0.4-0.6
  shoot: function(shotLocationPercent){
    return this.shotAccuracy * this.shotPower * shotLocationPercent * this.confidence;
  }
}

//.12 .15 .12
//.22 .3 .22
//.05 .075 .05
