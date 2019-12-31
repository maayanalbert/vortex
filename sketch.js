//Maayan Albert
//SectionD
//malbert@andrew.cmu.edu
//Project-09


//creates a variable for the number of hexagons
var nHexagons = 300;

//creates a variable for the size of the angles in each hexagon
var hexagonDegree = 60;

//creates a variable for the lengh of each hexagon's sides
var hexagonSideLength = 10;

//creates a variable for the number of sides on each hexigon
var hexagonNumberOfSides = 6;

//creates a variable to represent the value of the golden angle
var goldenAngle = 137.507764;

//creates a variable to signify relative distance of mouse from center
//of canvas
var mouseDistanceFromCenter;

function setup() {
  createCanvas(710, 500);  
}

function draw() {
  translate(width*.1, height*.1)
  scale(.8, .8)

  ///Changes definition of mouseDistanceFromCenter for each quadrant.
  //This ensures that it is smalllest in the center of the canvas as 
  //opposed to the upper left corner.
  if(mouseX < width / 2 && mouseY < height / 2){

  //takes the hypotenuse of the triangle created by mouseX and mouseY to 
  //find mouseDistanceFromCenter
  mouseDistanceFromCenter = sqrt((width - mouseX) * (width - mouseX) + 
    (height - mouseY) * (height - mouseY));

  }else if(mouseX > width / 2 && mouseY < height / 2){
    mouseDistanceFromCenter = sqrt(mouseX * mouseX + 
      (height - mouseY) * (height - mouseY));
  }else if(mouseX > width / 2 && mouseY > height / 2){
    mouseDistanceFromCenter = sqrt(mouseX * mouseX + mouseY * mouseY);
  }else{
    mouseDistanceFromCenter = sqrt((width - mouseX) * 
      (width - mouseX) + mouseY * mouseY);
  }
  
  mouseDistanceFromCenter *= 1.3
  

  //calculates the space between the first two hexagons based on the 
  //mouse's relative distance from the center of the canvas
  var spaceBetweenHexagons = min(Math.pow(mouseDistanceFromCenter, 6) / Math.pow(10, 16), 50)
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
  turtle.setWeight(17);
  
  //repeats turtle movement to the location of the next hexagon 
  for(i = 0; i < nHexagons; i++){
    
    //creates color gradient for hexagons
    turtle.setColor( i * (255 / nHexagons));

    
    //tells turtle to start drawing
    turtle.penDown();

    //draws 6 sides for each hexagon
    for(j = 0; j < hexagonNumberOfSides; j++){
      turtle.forward(hexagonSideLength);
      turtle.left(hexagonDegree);
    }

    //tells turtle to stop drawing as it moves to the location of 
    //the next turtle
    turtle.penUp();

    //moves turtle by a slightly larger distance for each hexagon
    turtle.left(goldenAngle);
    turtle.forward(2 *(spaceBetweenHexagons + i/ 5));
    turtle.right(90);
    turtle.forward(20);
  }
  pop();  
}

// function hexagon(x, y){

//  var turtle = new Turtle(x, y);

//  var hexagonDegree = 60;
//  var hexagonSideLength = 10;
//  var hexagonNumberOfSides = 6;

//  turtle.penDown();
//  for(i = 0; i < hexagonNumberOfSides; i++){
//    turtle.forward(hexagonSideLength);
//    turtle.left(hexagonDegree);
//  }
//  turtle.penUp();

// }



// var turtle = new Turtle(x, y); // make a turtle at x, y, facing right, pen down
// turtle.left(d);                // turn left by d degrees
// turtle.right(d)                // turn right by d degrees
// turtle.forward(p);             // move forward by p pixels
// turtle.back(p);                // move back by p pixels
// turtle.penDown();              // pen down
// turtle.penUp();                // pen up
// turtle.goto(x, y);             // go straight to this location
// turtle.setColor(color);        // set the drawing color
// turtle.setColor(color(r,g,b)); // can be used to set color with r, g, b, values
// turtle.setWeight(w)            // set the line width to w
// turtle.face(d);                // turn to this absolute direction in degrees
// turtle.angleTo(x, y);          // what is the angle from my heading to location x, y?
// turtle.turnToward(x, y, d);    // turn by d degrees toward location x, y
// turtle.distanceTo(x, y);       // how far is it to location x, y?


//=======================================================
// TURTLE GRAPHICS IMPLEMENTATION
// Roger Dannenberg, 2015
//
// Turtle(x, y) -- make a turtle at x, y, facing right, pen down
// left(d) -- turn left by d degrees
// right(d) -- turn right by d degrees
// forward(p) -- move forward by p pixels
// back(p) -- move back by p pixels
// penDown() -- pen down
// penUp() -- pen up
// goto(x, y) -- go straight to this location
// setColor(color) -- set the drawing color
// setWeight(w) -- set line width to w
// face(d) -- turn to this absolute direction in degrees
// angleTo(x, y) -- what is the angle from my heading to location x, y?
// turnToward(x, y, d) -- turn by d degrees toward location x, y
// distanceTo(x, y) -- how far is it to location x, y?
//
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
  this.setColor = function(c) {
    this.color = c;
  };
  this.setWeight = function(w) {
    this.weight = w;
  };
  this.face = function(angle) {
    this.angle = angle;
  }
}
