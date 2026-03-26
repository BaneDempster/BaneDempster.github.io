/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  //TODO 3: Create a constant named KEY that maps key names
  const KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    //CHALLENGE: add a set of keys for WASD
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  };
  
  // Game Item Objects

  //TODO 4: Create walker variable and assign an object to it
  var walker = {
    x: 350,
    y: 0,
    speedX: 0,
    speedY: 0,
    isTagger: false,
  };

  //CHALLENGE: create second walker 
  var secondWalker = {
    x: 5,
    y: 0, 
    speedX: 0,
    speedY: 0,
    isTagger: true,
  };
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  //Register an event listener for keydown events
  $(document).on('keydown', handleKeyDown);
  //TODO 8: register another event listener for keyup events
  $(document).on('keyup', handleKeyUp);
  //CHALLENGE: register event handlers to change box color on click
  $("#walker").on("click", handleClick);
  $("#secondWalker").on("click", secondHandleClick);                          

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    //TODO 5: call the repositionGameItem helper function inside the newFrame function 
    repositionGameItem();
    //TODO 9: call the wallCollision helper function inside the newFrame function
    wallCollision();
    //CHALLENGE: call the collisionDetection helper function inside the newFrame function
    collisionDetection(secondWalker, walker);
    //TODO 6: call the redrawGameItem helper function inside the newFrame function
    redrawGameItem();   
  }
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */

  //TODO 3: create the handleKeyDown function
  function handleKeyDown(event) {
  //TODO 7: Change the walker’s speed when the player presses an arrow key so it starts moving in that direction
    if(event.which === KEY.LEFT){
      walker.speedX = -5;
    }
    if(event.which === KEY.RIGHT){
      walker.speedX = 5;
    }
    if(event.which === KEY.UP){
      walker.speedY = -5;
    }
    if(event.which === KEY.DOWN){
      walker.speedY = 5;
    }
    if(event.which === KEY.W){
      secondWalker.speedY = -5;
    }
    if(event.which === KEY.D){
      secondWalker.speedX = 5;
    }
    if(event.which === KEY.S){
      secondWalker.speedY = 5;
    }
    if(event.which === KEY.A){
      secondWalker.speedX = -5;
    }
    if(event.which === KEY.ENTER){
      console.log("enter pressed");
    }
  }
  //TODO 8: create the handleKeyUp function. When the player releases a key, the walkers stop moving. 
  function handleKeyUp(event){
    if(event.which === KEY.LEFT){
      walker.speedX = 0;
    }
    if(event.which === KEY.RIGHT){
      walker.speedX = 0;
    }
    if(event.which === KEY.UP){
      walker.speedY = 0;
    }
    if(event.which === KEY.DOWN){
      walker.speedY = 0;
    }
    if(event.which === KEY.A){
      secondWalker.speedX = 0;
    }
    if(event.which === KEY.D){
      secondWalker.speedX = 0;
    }
    if(event.which === KEY.W){
      secondWalker.speedY = 0;
    }
    if(event.which === KEY.S){
      secondWalker.speedY = 0;
    }
  }
  //CHALLENGE: create functions to change a walker's color when it is clicked on
  function handleClick(){
    var randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  $("#walker").css("background-color", randomColor);
  }

  function secondHandleClick(){
    var randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  $("#secondWalker").css("background-color", randomColor);
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //TODO 5: Create a helper function named repositionGameItem() that updates the walker's position
  function repositionGameItem(){
    walker.x += walker.speedX;
    walker.y += walker.speedY;
    secondWalker.x += secondWalker.speedX;
    secondWalker.y += secondWalker.speedY;
  }

  //TODO 6: create a helper function named redrawGameItem() that moves the walker on the screen
  function redrawGameItem(){
    $("#walker").css("top", walker.y);
    $("#walker").css("left", walker.x);
    $("#secondWalker").css("left", secondWalker.x);
    $("#secondWalker").css("top", secondWalker.y);
  }

  //TODO 9: create a helper function named wallCollision() that prevents the walker from leaving the board
  function wallCollision(){
    var maxBoardWidth = $("#board").width();
    var maxBoardHeight = $("#board").height();
    if(walker.x < 0){
      walker.x -= walker.speedX;
    }
    if(walker.x > maxBoardWidth - 50){
      walker.x -= walker.speedX;
    }
    if(walker.y < 0){
      walker.y -= walker.speedY;
    }
    if(walker.y > maxBoardHeight - 50){
      walker.y -= walker.speedY;
    }
     if(secondWalker.x < 0){
      secondWalker.x -= secondWalker.speedX;
    }
    if(secondWalker.x > maxBoardWidth - 50){
      secondWalker.x -= secondWalker.speedX;
    }
    if(secondWalker.y < 0){
      secondWalker.y -= secondWalker.speedY;
    }
    if(secondWalker.y > maxBoardHeight - 50){
      secondWalker.y -= secondWalker.speedY;
    }
  }
  var collided = false;
  
  function resetDetection(){
    collided = false;
  }

  function collisionDetection(chaser, runner){
    var chaserRight = chaser.x + 50;
    var chaserBottom = chaser.y + 50;
    var chaserLeft = chaser.x;
    var chaserTop = chaser.y;
    var runnerRight = runner.x + 50;
    var runnerBottom = runner.y + 50;
    var runnerLeft = runner.x;
    var runnerTop = runner.y;
    if(chaserRight > runnerLeft && chaserTop < runnerBottom && chaserBottom > runnerTop && chaserLeft < runnerRight){
      collided = true;
      changeColor(chaser, runner);
      changeTagger(chaser, runner);
      resetDetection();
      setTimeout(changeTagger, 3000);
      }
  }
     setTimeout(collisionDetection, 3000);
  function changeColor(chaser, runner){
    if(chaser === tagger){
      $("#secondWalker").css("background-color", "blue");
      $("#walker").css("background-color", "red");
    }
    else if(runner === tagger){
      $("#secondWalker").css("background-color", "red");
      $("#walker").css("background-color", "blue");
    }
  }

  function changeTagger(chaser, runner){
    if(chaser.isTagger){
      chaser.isTagger = false;
      runner.isTagger = true;
    }
    else if(runner.isTagger){
      chaser.isTagger = true;
      runner.isTagger = false;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
