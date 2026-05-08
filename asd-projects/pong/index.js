/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
   var updatedScore1 = 0;
   var updatedScore2 = 0;
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
    $(document).on("keydown", handleKeydown);
    $(document).on("keyup", handleKeyup);               // change 'eventType' to the type of event you want to handle
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
    wallCollision(ball);
    wallCollision(leftPaddle);
    wallCollision(rightPaddle);

    if(doCollide(ball, leftpaddle)){
    ball.speedX *= -1;
  }

  if(doCollide(ball, rightPaddle)){
    ball.speedX *= -1;
  }

  }
  
  /* 
  Called in response to events.
  */
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function handleKeydown(event){
    if(event.which === KEYS.UP){
      rightPaddle.speedY = -50;
      moveObject(rightPaddle);
      console.log("right paddle moving up");
    }
    if(event.which === KEYS.DOWN){
      rightPaddle.speedY = 50;
      moveObject(rightPaddle);
      console.log("right paddle moving down");
    }
    if(event.which === KEYS.W){
      leftPaddle.speedY = -50;
      moveObject(leftPaddle);
      console.log("left paddle moving up");
    }
    if(event.which === KEYS.S){
      leftPaddle.speedY = 50;
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
    ball.x = BOARD_WIDTH / 2;
    ball.y = BOARD_HEIGHT / 2;
    ball.speedX = (Math.random() * 2 + 1) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = 1;
  }

  function moveObject(object){
    object.x += object.speedX;
    object.y += object.speedY;
    $(object.id).css("left", object.x);
    $(object.id).css("top", object.y);
  }

  function wallCollision(object){
    if(object.x < 0){
      updatedScore2++;
      startBall();
      $("#player2Score").text("Player 2 score: " + updatedScore2);
    }
    if(object.y < 0){
      object.speedY *= -1;
    }
    if((object.x + object.width) > BOARD_WIDTH){
      updatedScore1++;
      startBall();
      $("#player1Score").text("Player 1 score: " + updatedScore1);
    }
    if((object.y + object.height) > BOARD_HEIGHT){
     object.speedY *= -1;
    }
  }

  function doCollide(obj1, obj2) {
    var top1 = obj1.y;
    var top2 = obj2.y;
    var bottom1 = obj1.y + obj1.height;
    var bottom2 = obj2.y + obj2.height;
    var left1 = obj1.x;
    var left2 = obj2.x;
    var right1 = obj1.x + obj1.width;
    var right2 = obj2.x + obj2.width;

    if(left1 < right2 && 
                right1 > left2 && 
                top1 < bottom2 && 
                bottom1 > top2){
    return true;
    }else{
    return false;
    }
}

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
