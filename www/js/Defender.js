var Defender = Object.create(Player);

Defender.type = "Defender";

Defender.getShotLocation = function(){
  var shotLocation = Object.create(Shot);
  var index = Math.floor(Math.random() * 3) + 6;
  console.log('Defender index: ' + index)
  return shotLocation.getPercentChance(index);
}
