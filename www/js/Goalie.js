var Goalie = {
  savePercentage: 0.85,
  confidence: 1.0,//between 1.00 and 1.1
  makeSave: function(shot){
    var saveChance = (this.savePercentage - shot) * this.confidence;
    console.log("Shot: " + shot);
    console.log("Save Chance: " + saveChance);
    return Math.random() <= saveChance;
  }
}
