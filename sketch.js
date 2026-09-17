//This creates a canvas that is responsive to your browser screen size. This part defines the size
function setup(){
  createCanvas(windowWidth,windowHeight);
}

//This part resizes
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function draw(){
  background(135,206,235);

  //Sun
  fill(255,221,89);
  noStroke();
  ellipse(width*0.85,height*0.15,100,100);

  fill(76,153,60);
  noStroke();
  rect(0,height*0.75,width,height*0.25);

  //This moves the origin to the center of the page adjusting with the screen size
  push();
  translate(width/2,height/2);

  //Legs
  stroke(20);
  strokeWeight(3);
  let legRowsY = [-30,0,30]; //vertical postions along the side of the body

  for (let y of legRowsY){
    let hipX = 80; //leg attaches to body
    let kneeX = hipX + 25;
    let kneeY = y + 20;
    let footX = kneeX - 10;
    let footY = kneeY + 20;

    //Right Legs
    line(hipX,y,kneeX,kneeY);
    line(kneeX,kneeY,footX,footY);

    //Left Legs
    line(-hipX,y,-kneeX,kneeY);
    line(-kneeX,kneeY,-footX,footY);
  }
  noStroke();

  //Body
  fill(200,30,20);
  noStroke();
  ellipse(0,0,180,140); //(horizontal position,vertical position,width,height)

  //line down the center of body
  stroke(20);
  strokeWeight(3);
  line(0,-70,0,70);
  noStroke();

  //This is an array for positioning the little circles
  fill(20);
  let spotPostitions = [
    [-45,-30],[-60,10],[-30,40],[-20,0], //left side
    [45,-30],[60,10],[30,40],[20,0] //right side
  ];
  //This calls the values in the array to postion the circles
  for (let pos of spotPostitions){
    ellipse(pos[0],pos[1],20,20);
  }

  //Head
  fill(20);
  ellipse(0,-70,80,60);

  //Antennae
  stroke(20);
  strokeWeight(3);
  line(-10,-95,-25,-130); //Left (-10,-95) starting point
  line(10,-95,25,-130); //Right (25,-130) ending point
  noStroke();
  fill(20);
  ellipse(-25,-130,8,8);
  ellipse(25,-130,8,8);

  pop(); //closes the push
}