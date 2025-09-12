$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid

    // TODO 2 - Create Platforms
    createPlatform(350, 400, 100, 50);
    createPlatform(1200, 650, 100, 50);
    createPlatform(1300, 520, 50, 25);
    createPlatform(1000, 600, 50, 50);
    createPlatform(700, 550, 40, 40);
    createPlatform(600, 500, 25, 25);
    createPlatform(650, 300, 100, 50);
    createPlatform(950, 300, 50, 25);
    createPlatform(1250, 300, 50, 50);

    // TODO 3 - Create Collectables
    createCollectable("Jabra", 1350, 630, 1, 1);
    createCollectable("Blueno", 690, 460, 1, 1);
    createCollectable("Kalifa", 400, 300, 1, 1);
    createCollectable("Kaku", 950, 200, 1, 1);
    createCollectable("Lucci", 1250, 200, 1, 1);
    createCollectable("Kumadori", 1310, 400, 1, 1);
    createCollectable("Fukoro", 1230, 500, 1, 1);

    // TODO 4 - Create Cannons
    createCannon("top", 470, 2000);
    createCannon("top", 990, 2000);
    createCannon("top", 1300, 2000);
    createCannon("left", 550, 2000);
    createCannon("left", 200, 2000);

    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
