let img;
let theta = 0;
var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

var terrain = [];
function preload() {
  img = loadImage('Corgi.jpg');
}
function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    /*for (var y = 0; y < rows; y++) {
     terrain[x][y] = 0; //specify a default value for now
     }*/
  }
  noStroke();
}

function draw() {

  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  background(100);
  orbitControl();
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 150);
  translate(-w /2, -h / 2 );
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      let v = terrain[x][y];
      v = map(v, -100, 100, 0, 255);
      fill(v-10, v-10, v-10);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  translate(w /2, h / 2 );
  push();
  translate(mouseX-width/2, (mouseY-height/2)*6);
  
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(255, 255, 255, locX, locY, 50);
  specularMaterial(250);
  shininess(50);
  torus(30, 10, 64, 64);
  
  rotateZ(theta * 0.1);
  rotateX(theta * 0.1);
  rotateY(theta * 0.1);
  texture(img);
  box(200);

  pop();
  theta += 0.05;
}
