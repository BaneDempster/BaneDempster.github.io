var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(
        hitZoneSize,
        damageFromObstacle
      );
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25;
      obstacleImage.y = -25;
      sawBladeHitZone.velocityX = -5;
    }

    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25);
      var pacifista = draw.bitmap("img/pacifista.png");
      pacifista.x = -50;
      pacifista.y = -50;
      pacifista.scaleX = 0.55;
      pacifista.scaleY = 0.55;
      enemy.addChild(pacifista);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = -5;
      enemy.onPlayerCollision = function enemyHit() {
        game.changeIntegrity(-10);
      };
      enemy.onProjectileCollision = function halleBotHit() {
        game.increaseScore(100);
        enemy.flyTo(1000, 250);
      };
    }

    function createReward(x, y) {
      var healthItem = game.createGameItem("healthItem", 25);
      var greenSquare = draw.bitmap("img/cola.png");
      greenSquare.x = -26;
      greenSquare.y = -35;
      greenSquare.scaleX = 0.5;
      greenSquare.scaleY = 0.5;
      healthItem.addChild(greenSquare);
      healthItem.x = x;
      healthItem.y = y;
      game.addGameItem(healthItem);
      healthItem.velocityX = -5;
      healthItem.onPlayerCollision = function healthItemHit() {
        game.changeIntegrity(+50);
      };
      healthItem.onProjectileCollision = function halleBotHit() {
        game.increaseScore(200);
        healthItem.fadeOut();
      };
    }

    function createMarker(x, y) {
      var endOfLevelMarker = game.createGameItem("endOfLevelMarker", 25);
      var purpleSquare = draw.bitmap("img/vegapunk.png");
      purpleSquare.x = -25;
      purpleSquare.y = -100;
      purpleSquare.scaleX = 0.5;
      purpleSquare.scaleY = 0.5;
      endOfLevelMarker.addChild(purpleSquare);
      endOfLevelMarker.x = x;
      endOfLevelMarker.y = y;
      game.addGameItem(endOfLevelMarker);
      endOfLevelMarker.velocityX = -5;
      endOfLevelMarker.onPlayerCollision = function endOfLevelMarkerHit() {
        startLevel();
      };
      endOfLevelMarker.onProjectileCollision = function halleHitEndOfLevel() {
        startLevel();
      };
    }

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;
      for(var i = 0; i < levelObjects.length; i++){
        var eachElement = levelObjects[i];
        var firstX = eachElement.x;
        var firstY = eachElement.y;
        if(eachElement.type === "sawblade"){
          createSawBlade(firstX, firstY);
        }
        else if(eachElement.type === "reward"){
          createReward(firstX, firstY);
        }
        else if(eachElement.type === "enemy"){
          createEnemy(firstX, firstY);
        }
        else if(eachElement.type === "endOfLevelMarker"){
          createMarker(firstX, firstY);
        }
      }
      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
