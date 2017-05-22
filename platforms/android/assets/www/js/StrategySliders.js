var OffensiveSliders = {
  passing: 0.0,
  shooting: 0.0,
  tipping: 0.0,
  screening: 0.0,
  aggresiveness: 0.0,
  carrying: 0.0,
  dumping: 0.0,
  shootingTendencies: [0.05, 0.10, 0.05,
                      0.15, 0.20, 0.15,
                      0.10, 0.10, 0.10],

  constructor: function(passing, shooting, tipping, screening, aggresiveness,
                        carrying, dumping){
    this.passing = passing;
    this.shooting = shooting;
    this.tipping = tipping;
    this.screening = screening;
    this.aggresiveness = aggresiveness;
    this.carrying = carrying;
    this.dumping = dumping;
  }
}

var DefensiveSliders = {
  shotBlocking: 0.0,
  pokeChecking: 0.0,
  hitting: 0.0,
  stretchPassing: 0.0,
  aggresiveness: 0.0,
  breakouts: ['Stay Close', 'Leave Early', 'Stay Wide'],
  breakoutPositioning: ['Strong Side Slant', 'Three High', 'Center Swing'],
  blueLineD: ['Hold Line', 'Pinch']
}
