//Players look for high quality chances over simply shooting
var CycleGame = Object.create(OffensiveSliders);
//passing, shooting, tipping, screening, aggresiveness, carrying, and dumping
CycleGame.constructor(0.7, 0.4, 0.2, 0.2, 0.5, 0.5, 0.5);
//Area of ice for shooting with the goal positioned above the array
CycleGame.shootingTendencies = [0.05, 0.15, 0.05,
                                0.05, 0.20, 0.05,
                                0.15, 0.15, 0.15];

//Players look for greasy goals and tend to shoot from anywhere
var CrashTheNet = Object.create(OffensiveSliders);
//passing, shooting, tipping, screening, aggresiveness, carrying, and dumping
CrashTheNet.constructor(0.3, 0.9, 0.6, 0.9, 0.75, 0.5, 0.5);
//Area of ice for shooting with the goal positioned above the array
CrashTheNet.shootingTendencies = [0.12, 0.12, 0.12,
                                 0.12, 0.04, 0.12,
                                 0.12, 0.12, 0.12];
