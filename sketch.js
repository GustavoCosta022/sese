// By Roni Kaufman
// https://ronikaufman.github.io/
// https://twitter.com/KaufmanRoni

let l = 720;
let seeed;
let colors = ["#008cff", "#0099ff", "#00a5ff", "#00b2ff", "#00bfff", "#00cbff", "#00d8ff", "#00e5ff", "#00f2ff", "#00ffff", "#ff7b00", "#ff8800", "#ff9500", "#ffa200", "#ffaa00", "#ffb700", "#ffc300", "#ffd000", "#ffdd00", "#ffea00"];
const N_FRAMES = 500;

function setup() {
  createCanvas(1920,1080);
  noFill();
  strokeCap(SQUARE);
  seeed = random(1000);
}

function draw() {
  clear();
  background("blue");
  randomSeed(seeed);
  blendMode(ADD)
  translate(width/2, height/2);
	rotate(frameCount/200);
  let z = (frameCount%N_FRAMES)/N_FRAMES;
  
  for (let i = 0; i < 6; i++) {
    stroke(random(colors));
    strokeWeight(random(2, 5));
    let n = floor(random(1, 13))*random([-1, 1]);
    let h = random(5, l/6);
		h *= -sq(2*z-1)+1;
    let sp = random([-3, -2, -2, -1, -1, -1, 1, 1, 1, 2, 2, 3]);
    makeWave(n, h, sp);
  }
  
  stroke(255);
  strokeWeight(4);
  circle(0, 0, l);
  
  if (frameCount % N_FRAMES === 0) {
    seeed = random(1000*frameCount);
  }
}

function makeWave(n, h, sp) {
  let t = TWO_PI*(frameCount%N_FRAMES)/N_FRAMES;
  beginShape();
  for (let x = -l/2; x < l/2; x++) {
    let z = map(x, -l/2, l/2, 0, 1);
    let alpha = -sq(2*z-1)+1;
    let off = sin(n*TWO_PI*(x+l/2)/l+sp*t)*h*alpha;
    curveVertex(x, off);
  }
  endShape();
}

// save jpg
let lapse = 0;    // mouse timer
function mousePressed(){
  // prevents mouse press from registering twice
  if (millis() - lapse > 400){
    save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
    lapse = millis();
  }
}