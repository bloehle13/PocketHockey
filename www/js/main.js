var hagelin = Object.create(Forward);
var hagelin2 = Object.create(Forward);
var vlasic = Object.create(Defender);
var smith = Object.create(Goalie);
var goals = 0;
var saves = 0;
for(var i = 0; i < 10; i++){
  var save = smith.makeSave(hagelin.shoot(hagelin.getShotLocation()));
  if(save) saves++;
  if(!save) goals++;
}
for(var i = 0; i < 10; i++){
  var save = smith.makeSave(hagelin2.shoot(hagelin2.getShotLocation()));
  if(save) saves++;
  if(!save) goals++;
}
for(var i = 0; i < 10; i++){
  var save = smith.makeSave(vlasic.shoot(vlasic.getShotLocation()));
  console.log(save);
  if(save) saves++;
  if(!save) goals++;
}
console.log('Goals: ' + goals + '\nSaves: ' + saves);
