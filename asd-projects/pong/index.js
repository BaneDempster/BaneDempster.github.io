/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEYS = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
  }
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  // Game Item Objects
  var rightPaddle = objectMaker("#rightPaddle", 0, 0);
  var leftPaddle = objectMaker("#leftPaddle", 0, 0);
  var ball = objectMaker("#ball", 0, 0);
  function objectMaker(id, speedX, speedY){
    const gameItem = {};
    gameItem.id = id;
    gameItem.x = parseFloat($(id).css("left"));
    gameItem.y = parseFloat($(id).css("top"));
    gameItem.speedX = speedX;
    gameItem.speedY = speedY;
    gameItem.width = $(id).width();
    gameItem.height = $(id).height();

    return gameItem;
  }

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball);

  

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {
    $(document).on("keydown", handleKeydown);
    $(document).on("keyup", handleKeyup);
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function handleKeydown(event){
    if(event.which === KEYS.UP){
      rightPaddle.speedY = -5;
      moveObject(rightPaddle);
      console.log("right paddle moving up");
    }
    if(event.which === KEYS.DOWN){
      rightPaddle.speedY = 5;
      moveObject(rightPaddle);
      console.log("right paddle moving down");
    }
    if(event.which === KEYS.W){
      leftPaddle.speedY = -5;
      moveObject(leftPaddle);
      console.log("left paddle moving up");
    }
    if(event.which === KEYS.S){
      leftPaddle.speedY = 5;
      moveObject(leftPaddle);
      console.log("left paddle moving down");
    }
  }

  function handleKeyup(event){
    if(event.which === KEYS.UP){
      rightPaddle.speedY = 0;
    }
    if(event.which === KEYS.DOWN){
      rightPaddle.speedY = 0;
    }
    if(event.which === KEYS.W){
      leftPaddle.speedY = 0;
    }
    if(event.which === KEYS.S){
      leftPaddle.speedY = 0;
    }
  }
  
  function startBall(){
    ball.x = 100;
    ball.y = 100;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = 5;
  }

  function moveObject(object){
    object.x += object.speedX;
    object.y += object.speedY;
    $(object.id).css("left", object.x);
    $(object.id).css("top", object.y);
  }

  function wallCollision(object){
    if(object.x < 0){
      $("#player2 score").text(updatedScore);
    }
    if(object.y < 0){
 
    }
    if((object.x + object.width) > BOARD_WIDTH){
      $("#player1 score").text(updatedScore);
    }
    if((object.y + object.height) > BOARD_HEIGHT){
     
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
