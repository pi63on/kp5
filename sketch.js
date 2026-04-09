choices = [1, 2, 3, 4];

function setup() {
  createCanvas(100*4, 100*4);
  background(220);
  textSize(11);
  // frameRate(20);
}

function draw() {
  background(220);
  push();
  translate(20, 20);
  stroke('rgb(248,248,0)');
  for (let t=0; t<5000; t++){
    x=map(sin(2*t), -1, 1, 0, width-40);
    y=map(cos(4*t + frameCount*PI/100), -1, 1, 0, height-40);
    let c = map(dist(mouseX, mouseY, x, y), 0, 500, 1, 0);
    
    stroke(255, 200 + 55*c, 100*c);
    circle(x, y, 1);
  }
  pop();
  text('x = sin(' + 2 + 't)', 20, 15);
  text('y = cos(' + 4 + 't)', width - 70, 15);
  
  
}

function mouseClicked(){
  if (lissaFlag){
    frameRate(20);
  } else {
    frameRate(10);
  }
  
}

function keyPressed() {
    if (key == 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
    }
}