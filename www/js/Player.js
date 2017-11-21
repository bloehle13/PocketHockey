var Player = {
  shotAccuracy: 0.85,
  shotPower: 0.85,
  confidence: 0.5,//between 0.4-0.6
  shotBlocking: 0.5,
  strength: 0.5,
  age: 21,
  speed: 0.5,
  durability: 0.98,
  injured: false,
  faceoffs: 0.5,
  passingShootingDiff: 0, //slider difference, 0 means slider in middle
  height: 73, //in inches
  energy: 1, //out of 0-1
  onIce: false, //on the bench initially
  shoot: function(shotLocation){
    var shotWide = this.missTheNet();
    if(shotWide){
      return 0;
    }
    else{
      if(this.injured){//shot is divided by 2 if injured
        return this.shotAccuracy * this.shotPower * shotLocation * this.confidence * this.energy / 2;
      }
      else{
        return this.shotAccuracy * this.shotPower * shotLocation * this.confidence * this.energy;
      }
    }
  },
  getShot: function(){
    var shotLocation = Object.create(Shot);
    return shotLocation.getShotLocation(this);
  },
  missTheNet: function(){
    //30% chance of missing the net
    return Math.random() <= 0.25;
  },
  drainEnergy: function(eventType){//drain energy based on event type
    switch(eventType){
      case 'shoot':
        this.energy -= 0.25;
        // console.log(this.energy);
        break;
      case 'pass':
        this.energy -= 0.1;
        // console.log(this.energy);
        break;
      case 'blockShot':
        this.energy -= 0.5;
        // console.log(this.energy);
        break;
      case 'turnover':
        this.energy -= 0.15;
        // console.log(this.energy);
        break;
      case 'faceoff':
        this.energy -= 0.05;
        // console.log(this.energy);
        break;
      case 'screen':
        this.energy -= 0.30;
        // console.log(this.energy);
        break;
      case 'tip':
        this.energy -= 0.35;
        // console.log(this.energy);
        break;

    }

    if(this.energy < 0){//ensures no negative energy
      this.energy = 0;
    }

    var position = UserTeam.getPlayerPositionOnScreen(this);


    switch(position){
      case 0://LW
        $('#fatigue-progress-bar-forward-left').css('width', this.energy*100 + "%");
        break;
      case 1://C
        $('#fatigue-progress-bar-forward-center').css('width', this.energy*100 + "%");
        break;
      case 2://RW
        $('#fatigue-progress-bar-forward-right').css('width', this.energy*100 + "%");
        break;
      case 3://LD
        $('#fatigue-progress-bar-defense-left').css('width', this.energy*100 + "%");
        break;
      case 4://RD
        $('#fatigue-progress-bar-defense-right').css('width', this.energy*100 + "%");
        break;
      default:
        break;
    }

  }
}

//.12 .15 .12
//.22 .3 .22
//.05 .075 .05
