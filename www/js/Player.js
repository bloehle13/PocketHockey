var Player = {
  shotAccuracy: 0.5,
  shotPower: 0.5,
  confidence: 0.5,//between 0.4-0.6
  type: "",
  shoot: function(STRATSMODIFIER){
    return this.shotAccuracy * this.shotPower * STRATSMODIFIER * this.confidence;
  },
  getShot: function(){
    var shotLocation = Object.create(Shot);
    console.log(shotLocation.getShotLocation(this));
    return shotLocation.getShotLocation(this);
  }
}

//.12 .15 .12
//.22 .3 .22
//.05 .075 .05
