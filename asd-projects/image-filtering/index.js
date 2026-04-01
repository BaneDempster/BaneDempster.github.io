// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(increaseGreenByBlue);
  applyFilter(decreaseBlue);
  applyFilterNoBackground(reddify);
  applyFilterNoBackground(increaseGreenByBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2, 3 & 5: Create the applyFilter function here
function applyFilter(filterFunction){
//iterate through each row in the image array
  for(var r = 0; r < image.length; r++){
  var row = image[r];
  //iterate through each column in each row of the image array
  for(var c = 0; c < row.length; c++){
   //store the each pixel location in a variable
    var pixel = image[r][c];
   var pixelArray = rgbStringToArray(pixel);
   // This is where I’ll modify the color values later
   filterFunction(pixelArray);
   var updatedPixel = rgbArrayToString(pixelArray);
   image[r][c] = updatedPixel;
  }
}
}

// TODO 9 Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
var backgroundColor = image[0][0];
for(var r = 0; r < image.length; r++){
  var row = image[r];
  for(var c = 0; c < row.length; c++){
  if(image[r][c] !== backgroundColor){
   var pixel = image[r][c];
   var pixelArray = rgbStringToArray(pixel);
   // This is where I’ll modify the color values later
   filterFunction(pixelArray);
   var updatedPixel = rgbArrayToString(pixelArray);
   image[r][c] = updatedPixel;
  }
  }
}
}

// TODO 6: Create the keepInBounds function
function keepInBounds(x){
//if the color value is lower than 0, make it zero. If the color value is higher than 255, make it 255. If the color value is between 0 and 255, keep it.
  return x < 0 ? 0: 
       x > 255 ? 255:
       x;
}
// TODO 4: Create reddify filter function
function reddify(pixelArray){
  //increase every pixel's red rgb value by 100
  pixelArray[RED] += 100;
  //make sure the red rgb value stays between 0 and 255
  keepInBounds(pixelArray[RED]);
}
// TODO 7 & 8: Create more filter functions
function decreaseBlue(pixelArray){
  //decrease every pixel's blue rgb value by 50
  pixelArray[BLUE] -= 50;
  //make sure the blue rgb value stays between 0 and 255
keepInBounds(pixelArray[BLUE]);
}

function increaseGreenByBlue(pixelArray){
  //increase every pixel's green rgb value by its blue rgb value
  pixelArray[GREEN] += pixelArray[BLUE];
  //make sure the green rgb value stays between 0 and 255
  keepInBounds(pixelArray[GREEN]);
}

// CHALLENGE code goes below here
function purpleFilter(pixelArray){
  pixelArray[BLUE] += 100;
  pixelArray[RED] += 100;
  keepInBounds(pixelArray[BLUE]);
  keepInBounds(pixelArray[RED]);
}

function vintageFilter(pixelArray){
  pixelArray[RED] += 100;
  pixelArray[GREEN] += 100;
  keepInBounds(pixelArray[GREEN]);
  keepInBounds(pixelArray[RED]);
}

function grayscaleFilter(pixelArray){
  var grayColor = ((pixelArray[RED] + pixelArray[BLUE] + pixelArray[GREEN])/ 3);
  pixelArray[RED] = grayColor;
  pixelArray[BLUE] = grayColor;
  pixelArray[GREEN] = grayColor;
}

function invertFilter(pixelArray){
  pixelArray[RED] = 255 - pixelArray[RED];
  pixelArray[GREEN] = 255 - pixelArray[GREEN];
  pixelArray[BLUE] = 255 - pixelArray[BLUE];
  keepInBounds(pixelArray[GREEN]);
  keepInBounds(pixelArray[RED]);
  keepInBounds(pixelArray[BLUE]);
}

function smudgeFilter(pixelArray){
for(var r = 0; r < image.length; r++){
  var row = image[r];
  for(var c = 0; c < row.length; c++){
    var average = (image[r][c] + image[r][c + 1]) / 2;

  }
}
}