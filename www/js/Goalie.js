var Goalie = {
  savePercentage: 0.9,
  confidence: 1.0,//between 1.00 and 1.1
  consistency: .02,//between .0 and .1
  makeSave: function(shot){
    var saveChance = (this.savePercentage - shot) * this.confidence;
    console.log("Shot: " + shot);
    console.log("Save Chance: " + saveChance);
    return Math.random() - this.consistency <= saveChance;//reduces effects of chance
  }
}
