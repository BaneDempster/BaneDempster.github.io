var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Save Dr. Vegapunk",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 250, y: groundY - 60 },
          { type: "sawblade", x: 850, y: groundY - 50 },
          { type: "sawblade", x: 1250, y: groundY - 30 },
          { type: "reward", x: 1800, y: groundY - 350 },
          { type: "reward", x: 450, y: groundY -350 }, 
          { type: "enemy", x: 750, y: groundY - 350 },
          { type: "enemy", x: 1000, y: groundY - 350 },
          { type: "enemy", x: 1500, y: groundY - 350 },
          { type: "endOfLevelMarker", x: 2500, y: groundY - 375 },
        ],
      },
      {
        name: "Fight St. Saturn",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 1500, y: groundY - 30 },
          { type: "sawblade", x: 900, y: groundY - 50 },
          { type: "sawblade", x: 1300, y: groundY - 80 },
          { type: "sawblade", x: 350, y: groundY - 350 },
          { type: "reward", x: 1000, y: groundY - 350 },
          { type: "reward", x: 700, y: groundY - 350 }, 
          { type: "enemy", x: 500, y: groundY - 350 },
          { type: "enemy", x: 800, y: groundY - 350 },
          { type: "enemy", x: 1200, y: groundY - 350 },
          { type: "endOfLevelMarker", x: 2000, y: groundY - 350 },
        ],
      },
     {
      name: "Escape Egghead Island",
        number: 3,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY - 50 },
          { type: "sawblade", x: 600, y: groundY - 60 },
          { type: "sawblade", x: 900, y: groundY - 30 },
          { type: "reward", x: 950, y: groundY - 350 },
          { type: "reward", x: 650, y: groundY -360 }, 
          { type: "enemy", x: 500, y: groundY - 350 },
          { type: "enemy", x: 800, y: groundY - 350 },
          { type: "enemy", x: 1200, y: groundY - 350 },
          { type: "endOfLevelMarker", x: 1500, y: groundY - 350 },
        ],
     } 
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
