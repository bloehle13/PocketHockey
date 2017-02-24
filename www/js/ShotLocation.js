var ShotLocation = {
  percentChances: [.12, .15, .12,
                    .22, .3, .22,
                    .05, .075, .05],
  getPercentChance: function(i){
    return this.percentChances[i];
  }
}
