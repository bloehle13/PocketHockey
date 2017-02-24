var hagelin = Object.create(Player);
var smith = Object.create(Goalie);
var goals = 0;
var saves = 0;
for(var i = 0; i < 30; i++){
  var save = smith.makeSave(hagelin.shoot());
  if(save) saves++;
  if(!save) goals++;
}
console.log('Goals: ' + goals + '\nSaves: ' + saves);
