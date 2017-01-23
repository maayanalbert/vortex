//Maayan Albert
//SectionD
//malbert@andrew.cmu.edu
//Project-09


//creates a variable for the number of hexagons
var nHexagons = 100;

//creates a variable for the size of the angles in each hexagon
var hexagonDegree = 60;

//creates a variable for the lengh of each hexagon's sides
var hexagonSideLength = 6;

//creates a variable for the number of sides on each hexigon
var hexagonNumberOfSides = 6;

//creates a variable to represent the value of the golden angle
var goldenAngle = 137.507764;

var maxDistanceFromCenter = 1026
var minDistanceFromCenter = 641

var minWeight = 10
var maxWeight = 3000

//creates a variable to signify relative distance of mouse from center
//of canvas
var distanceFromCenter = minDistanceFromCenter

// var color1 = [135, 136, 219]
// var color2 = [71, 41, 161]

var color1 = [135, 216, 240]
var color2 = [19, 110, 253]

function setup() {
  createCanvas(800, 800);  
}

function draw() {
  updateDistanceFromCenter()

  //calculates the space between the first two hexagons based on the 
  //mouse's relative distance from the center of the canvas
  var spaceBetweenHexagons = 
    Math.pow(distanceFromCenter, 6) / Math.pow(10, 16);

  //calculates the position of the first hexagon based on a scaled 
  //version of the space between hexagons
  var xCoordinateForFirstHexagon = spaceBetweenHexagons * 2.9;

  //sets background in draw so that all previous frames of animation 
  //aren't visible
  background(255);

  push();

  //translates first turtle design to center of canvas with minor offsets 
  //to ensure empty space is in center as opposed to the first hexagon
  translate(width/2 - xCoordinateForFirstHexagon / 40, 
    height/2 - xCoordinateForFirstHexagon / 3.5);

  //creates a new turtle
  var turtle = new Turtle(xCoordinateForFirstHexagon * .75, 0);

  //thickens turtle's line weight to create the appearance of solid 
  //shapes
  
  //repeats turtle movement to the location of the next hexagon 
  for(i = 0; i < nHexagons; i++){

    // creates color gradient for hexagons
    conversionUnit =  (i/ nHexagons)

    currentColor = [(color1[0] * conversionUnit) + (color2[0] * (1 - conversionUnit)),
                    (color1[1] * conversionUnit) + (color2[1] * (1 - conversionUnit)),
                    (color1[2] * conversionUnit) + (color2[2] * (1 - conversionUnit))]

    turtle.setColor(currentColor[0], currentColor[1], currentColor[2]);

    
    //tells turtle to start drawing
    turtle.penDown();


    conversionUnitSize = (conversionUnit * 1/(spaceBetweenHexagons*.1))
    turtleSize = hexagonSideLength * conversionUnitSize/5
    turtleWeight = map(conversionUnitSize, 0, 200, minWeight, maxWeight)
    // if(turtleWeight < minWeight){
    //   turtleWeight = minWeight
    // }

    turtle.setWeight(turtleWeight);


    //draws 6 sides for each hexagon
    for(j = 0; j < hexagonNumberOfSides; j++){
      // turtleSize = hexagonSideLength
      // minSize = hexagonSideLength
      // if(turtleSize < minSize){
      //   turtleSize = minSize
      // }
      turtle.forward(turtleSize);
      turtle.left(hexagonDegree);
    }

    //tells turtle to stop drawing as it moves to the location of 
    //the next turtle
    turtle.penUp();

    //moves turtle by a slightly larger distance for each hexagon
    turtle.left(goldenAngle);
    turtle.forward(2 *(spaceBetweenHexagons + i / 5));
    turtle.right(90);
    turtle.forward(20);
  }
  pop(); 
}

function updateDistanceFromCenter() {

  if(distanceFromCenter <= minDistanceFromCenter + 75){
    growing = true
  }else if((round(distanceFromCenter) >= maxDistanceFromCenter - 5)){
    growing = false
  }

  if(growing == true){
    speed = .95
    target = maxDistanceFromCenter
  }else if(growing == false){
    speed = .98 
    target = minDistanceFromCenter
  }
  distanceFromCenter = speed*distanceFromCenter + (1-speed)*target
}

//turtle graphics curtesy of Golan Levin
function Turtle(x, y) {
  this.x = x;
  this.y = y;
  this.angle = 0.0;
  this.penIsDown = true;
  this.color = color(128);
  this.weight = 1;
 
  this.left = function(d) {
    this.angle -= d;
  };
  this.right = function(d) {
    this.angle += d;
  };
  this.forward = function(p) {
    var rad = radians(this.angle);
    var newx = this.x + cos(rad) * p;
    var newy = this.y + sin(rad) * p;
    this.goto(newx, newy);
  };
  this.back = function(p) {
    this.forward(-p);
  };
  this.penDown = function() {
    this.penIsDown = true;
  };
  this.penUp = function() {
    this.penIsDown = false;
  };
  this.goto = function(x, y) {
    if (this.penIsDown) {
      stroke(this.color);
      strokeWeight(this.weight);
      line(this.x, this.y, x, y);
    }
    this.x = x;
    this.y = y;
  };
  this.distanceTo = function(x, y) {
    return sqrt(sq(this.x - x) + sq(this.y - y));
  };
  this.angleTo = function(x, y) {
    var absAngle = degrees(atan2(y - this.y, x - this.x));
    var angle = ((absAngle - this.angle) + 360) % 360.0;
    return angle;
  };
  this.turnToward = function(x, y, d) {
    var angle = this.angleTo(x, y);
    if (angle < 180) {
      this.angle += d;
    } else {
      this.angle -= d;
    }
  };
  this.setColor = function(c0, c1, c2) {
    this.color = color(c0, c1, c2);
    // this.color = 0
  };
  this.setWeight = function(w) {
    this.weight = w;
  };
  this.face = function(angle) {
    this.angle = angle;
  }
}