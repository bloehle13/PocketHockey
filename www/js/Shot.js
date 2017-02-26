var Shot = {
  percentChances: [.12, .15, .12,
                    .22, .3, .22,
                    .05, .075, .05],

  getShotLocation: function(player){
    if(player.type === 'Forward'){
      return this.percentChances[(Math.floor(Math.random() * 9))];
    }
    else if(player.type === 'Defender'){
      return this.percentChances[(Math.floor(Math.random() * 9))];
    }
  },

}
