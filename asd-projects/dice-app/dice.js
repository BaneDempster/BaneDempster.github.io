$(document).ready(function () {
  // Your code goes here
function makeDot(top, left, elementID){
$("<div>")
  .css("height", 15)
  .css("width", 15)
  .css("background-color", "black")
  .css("position", "absolute")
  .css("top", top)
  .css("left", left)
  .css("border-radius", "25px")
  .appendTo(elementID);
}
function rollDie(dieID){
  $(dieID).empty();
  var randomNum = Math.ceil(Math.random() * 6);
  if (randomNum === 1) {
  makeDot(45, 40, dieID); // middle middle
} else if (randomNum === 2) {
  makeDot(10, 10, dieID); // top left
  makeDot(75, 75, dieID); // bottom right
} else if (randomNum === 3) {
  makeDot(10, 10, dieID); // top left
  makeDot(75, 75, dieID); // bottom right
  makeDot(45, 40, dieID); // middle middle
} else if (randomNum === 4) {
  makeDot(75, 75, dieID); // bottom right
  makeDot(10, 10, dieID); // top left
  makeDot(10, 75, dieID); // bottom left
  makeDot(75, 10, dieID); // top right
} else if (randomNum === 5) {
  makeDot(45, 40, dieID); // middle middle
  makeDot(75, 75, dieID); // bottom right
  makeDot(10, 10, dieID); // top left
  makeDot(10, 75, dieID); // bottom left
  makeDot(75, 10, dieID); // top right
} else if (randomNum === 6){
  makeDot(75, 75, dieID); // bottom right
  makeDot(10, 10, dieID); // top left
  makeDot(10, 75, dieID); // bottom left
  makeDot(75, 10, dieID); // top right
  makeDot(45, 10, dieID); // middle left
  makeDot(45, 75, dieID); // middle right
}
  console.log(randomNum);
}
function handleClick(){
  rollDie("#die");
  rollDie("#die2");
}
$("button")
.text("Roll Dice")
.on("click", handleClick);
});
