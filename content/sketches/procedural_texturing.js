
let pg;
let truchetShader;
let textures = ['bricks.frag', 'colorful.frag', 'bathroom.frag', 'color_bathroom.frag', 'colorful2.frag'];
let figures = [
  function() {
    box(200, 200);
  },
  function() {
    torus(50, 50);
  },
  function() {
    cone(100, -200);
  },
  function() {
    sphere(100, 100);
  },
  function() {
    cylinder(100, 200);
  }
];

let index;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  let randomTexture = random(textures);
  truchetShader = readShader(randomTexture);
}

function setup() {
  index = floor(random(figures.length));
  createCanvas(800, 800, WEBGL);
  pg = createGraphics(800, 800, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  pg.shader(truchetShader);
  pg.emitResolution(truchetShader);
  truchetShader.setUniform('u_zoom', 3);
  console.log(pg);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
}

function draw() {
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  background(32);
  orbitControl();
  figures[index]();
  //box(200, 200);
  //torus(50, 50);
  //cone(100, -200);
  //sphere();
  //cylinder(100, 200);
}

function mouseMoved() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let zoomValue = int(map(mouseX, 0, width, 1, 30));
    truchetShader.setUniform('u_zoom', zoomValue);
    pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  }
}