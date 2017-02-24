var Forward = Object.create(Player);
Forward.getShotLocation = function(){
  var shotLocation = Object.create(ShotLocation);
  var index = Math.floor(Math.random() * (shotLocation.percentChances.length - 3));
  var index = Math.floor(Math.random() * 6);
  console.log('Forward index: ' + index)
  return shotLocation.getPercentChance(index);
}
