let ladybugX; //Ladybugs horizontal position
let ladybugY; //Ladybugs vertical position
let moveSpeed = 3; //Pixels moved perfram when key is held down
let wiggle = 0; //Used to animate legs and antennae
 
//Array for drawing/updating clouds
let clouds = [
  { x: 0,   y: 0.12, speed: 0.3, size: 60 },
  { x: 300, y: 0.22, speed: 0.2, size: 80 },
  { x: 600, y: 0.08, speed: 0.4, size: 50 }
];
 
let leafX = -50;
let leafSpeed = 2.2;
 
let sunRayAngle = 0;

let timeState = 0; //0 = day, 1 = sunset, 2 = night

function mousePressed() {
  timeState = (timeState + 1) % 3; //Cycle through day, sunset, night
}
 
//This creates a canvas that is responsive to your browser screen size. This part defines the size
function setup() {
  createCanvas(windowWidth, windowHeight);
  ladybugX = windowWidth / 2;
  ladybugY = windowHeight / 2;
}

//This part resizes the canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
 
function draw() {
  let skyColor, sunColor, showRays, showStars;
  if (timeState === 0){
    skyColor = color(135, 206, 235); //Day sky
    sunColor = color(255, 221, 89);
    showRays = true;
    showStars = false;
  } else if (timeState === 1){
    skyColor = color(255, 140, 90); //Sunset sky
    sunColor = color(255, 100, 60);
    showRays = true;
    showStars = false;
  } else {
    skyColor = color(10, 10, 40); //Night sky
    sunColor = color(225, 221, 235);
    showRays = false;
    showStars = true;
  }
  background(skyColor);

  if (showStars) {
    fill(255);
    noStroke();
    let starPositions = [[0.1, 0.1], [0.25, 0.3], [0.4, 0.15], [0.6, 0.25], [0.75, 0.1],
  [0.9, 0.3], [0.5, 0.05]];
    for (let s of starPositions) {
      ellipse(s[0] * width, s[1] * height, 3, 3);
    }
  }
 
  //Sun
  let sunX = width * 0.85;
  let sunY = height * 0.15;
 
  sunRayAngle += 0.01;
 
  if (showRays) {
    push();
    translate(sunX, sunY);
    rotate(sunRayAngle);
    stroke(sunColor); //Sun rays
    strokeWeight(4);
    let rayCount = 8;
    for (let i = 0; i < rayCount; i++) {
      let angle = (TWO_PI / rayCount) * i;  //Even spaces the rays around the sun
      let x1 = cos(angle) * 60;
      let y1 = sin(angle) * 60;
      let x2 = cos(angle) * 80;
      let y2 = sin(angle) * 80;
      line(x1, y1, x2, y2);
    }
    pop();
  }

  fill(sunColor);
  noStroke();
  ellipse(sunX, sunY, 100, 100);
 
  //Clouds
  for (let cloud of clouds) {
    cloud.x += cloud.speed;
    if (cloud.x > width + 100) {
      cloud.x = -100;
    }
    drawCloud(cloud.x, cloud.y * height, cloud.size);
  }
 
  //Leaf
  leafX += leafSpeed;
  if (leafX > width + 50) {
    leafX = -50;
  }
  let leafY = height * 0.35 + sin(frameCount * 0.1) * 20; //Bob the leaf up and down
  let leafSpin = sin(frameCount * 0.15);  //Leaf rotation
  drawLeaf(leafX, leafY, leafSpin);
 
  //Ground
  fill(76, 153, 60);
  noStroke();
  rect(0, height * 0.75, width, height * 0.25);
 
  //Grass
  let grassX = 0;
  stroke(50, 120, 60);
  strokeWeight(2);
  while (grassX < width) {
    line(grassX, height * 0.75, grassX + 3, height * 0.75 - 12);
    grassX += 12;
  }
  noStroke();

  //Flowers
  let flowerXs = [width * 0.15, width * 0.35, width * 0.65, width * 0.85];
  for (let fx of flowerXs) {
    drawFlower(fx, height * 0.78);
  }
 
  if (keyIsDown(87)) {
    ladybugY -= moveSpeed; //W key moves up
  } else if (keyIsDown(83)) {
    ladybugY += moveSpeed; //S key moves down
  } else if (keyIsDown(65)) {
    ladybugX -= moveSpeed; //A key moves left
  } else if (keyIsDown(68)) {
    ladybugX += moveSpeed; //D key moves right
  }

  wiggle = sin(frameCount * 0.2) * 6;
 
  push();
  translate(ladybugX, ladybugY);
 
  //Legs
  stroke(20);
  strokeWeight(3);
  let legRowsY = [-30, 0, 30];  //Vertical positions along the side of the body
 
  for (let i = 0; i < legRowsY.length; i++) {
    let y = legRowsY[i];
    let phase = i * 2;
    let legWiggle = sin(frameCount * 0.2 + phase) * 6;
 
    let hipX = 80;  //Leg attaches to body
    let kneeX = hipX + 25;
    let kneeY = y + 20 + legWiggle;
    let footX = kneeX - 10;
    let footY = kneeY + 20;
 
    //Right Legs
    line(hipX, y, kneeX, kneeY);
    line(kneeX, kneeY, footX, footY);
 
    //Left Legs
    line(-hipX, y, -kneeX, kneeY);
    line(-kneeX, kneeY, -footX, footY);
  }
  noStroke();
 
  //Body
  fill(200, 30, 20);
  noStroke();
  ellipse(0, 0, 180, 140);  //(horizontal position,vertical position,width,height)
 
  //Line down the center of body
  stroke(20);
  strokeWeight(3);
  line(0, -70, 0, 70);
  noStroke();
 
  //This is an array for positioning the little circles
  fill(20);
  let spotPositions = [
    [-45, -20], [-55, 15], [-30, 40], //Left side
    [45, -20],  [55, 15],  [30, 40] //Right side
  ];
  //This calls the values in the array to postion the circles
  for (let pos of spotPositions) {
    ellipse(pos[0], pos[1], 20, 20);
  }
 
  //Head
  fill(20);
  ellipse(0, -70, 60, 60);
 
  //Antennae
  stroke(20);
  strokeWeight(3);
  line(-10, -95, -25 + wiggle, -130); //Left (-10,-95) starting point
  line(10, -95, 25 + wiggle, -130); //Right (10,-95) starting point
  noStroke();
  fill(20);
  ellipse(-25 + wiggle, -130, 8, 8);
  ellipse(25 + wiggle, -130, 8, 8);
 
  //Closes the push
  pop();
}

//Draws one leaf shape
function drawLeaf(x, y, spin) {
  push();
  translate(x, y);
  rotate(spin * 0.4); //Rotation
 
  fill(60, 140, 50);
  noStroke();
  ellipse(0, 0, 40, 20);  //The leaf blade
 
  stroke(40, 100, 35);
  strokeWeight(2);
  line(-20, 0, 20, 0);  //Center vein
  noStroke();
 
  pop();
}
 
//Draws one cloud as three overlapping white ellipses
function drawCloud(x, y, size) {
  fill(255);
  noStroke();
  ellipse(x, y, size, size * 0.6);
  ellipse(x - size * 0.35, y + size * 0.1, size * 0.7, size * 0.5);
  ellipse(x + size * 0.35, y + size * 0.1, size * 0.7, size * 0.5);
}
 
//Draws one flower
function drawFlower(x, y) {
  let stemTopY = y - 40;
 
  //Stem
  stroke(34, 120, 34);
  strokeWeight(4);
  line(x, y, x, stemTopY);
  noStroke();
 
  //Petals
  fill(255);
  let petalOffsets = [[0, -10], [10, 0], [0, 10], [-10, 0]];
  for (let p of petalOffsets) {
    ellipse(x + p[0], stemTopY + p[1], 14, 14);
  }

  //Flower center
  fill(255, 200, 0);
  ellipse(x, stemTopY, 10, 10);
}