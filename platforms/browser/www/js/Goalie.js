var Goalie = {
  savePercentage: 0.9,
  confidence: 1.05,//between 1.00 and 1.1
  consistency: .05,//between .0 and .1
  makeSave: function(shot){
    if(shot === 0){//if the shot misses the net, a save isn't required
      return null;
    }
    else{
      var saveChance = (this.savePercentage - shot) * this.confidence;
      console.log("Shot: " + shot);
      console.log("Save Chance: " + saveChance);
      return Math.random() - this.consistency <= saveChance;//reduces effects of chance
    }
  }
}
