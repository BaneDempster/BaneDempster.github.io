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
  };
  
  // Game Item Objects

  //TODO 4: Create walker variable and assign an object to it
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
  };
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  $(document).on('keydown', handleKeyDown);
  //TODO 8: register another event listener for keyup events
  $(document).on('keyup', handleKeyUp);                          

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
    if(event.which === KEY.ENTER){
      console.log("enter pressed");
    }
  }
  //TODO 8: create the handleKeyUp function
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
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //TODO 5: Create a helper function named repositionGameItem() that updates the walker's position
  function repositionGameItem(){
    walker.x += walker.speedX;
    walker.y += walker.speedY;
  }

  //TODO 6: create a helper function named redrawGameItem() that moves the walker on the screen
  function redrawGameItem(){
    $("#walker").css("top", walker.y);
    $("#walker").css("left", walker.x);
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
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
