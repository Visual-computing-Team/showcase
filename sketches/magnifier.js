let img;
let shaderProgram;
let circleSizeSlider;
let magnificationFactorSlider;

function preload() {
  img = loadImage('/showcase/sketches/images/image.jpg');
  shaderProgram = loadShader('/showcase/sketches/magnifier.vert', '/showcase/sketches/magnifier.frag');
}

function setup() {
  createCanvas(600*img.width/img.height, 600, WEBGL);
  noStroke();
  shader(shaderProgram);
  shaderProgram.setUniform('uSampler', img);
  shaderProgram.setUniform('uResolution', [width, height]);

  // Create the circle size slider
  circleSizeSlider = createSlider(50, 200, 100, 0.5);
  circleSizeSlider.position(10, 10);

  // Create the magnification factor slider
  magnificationFactorSlider = createSlider(0, 2, 1, 0.01);
  magnificationFactorSlider.position(10, 30);
}

function draw() {
  // Update magnifier center and radius based on mouse input
  let magnifierCenter = [mouseX / width, mouseY / height];
  let magnifierRadius = circleSizeSlider.value();

  shaderProgram.setUniform('uMagnifierCenter', magnifierCenter);
  shaderProgram.setUniform('uMagnifierRadius', magnifierRadius);

  // Set the kernel and magnifier values
  let kernel = [ // Example: Identity kernel
    0, 0, 0,
    0, 1, 0,
    0, 0, 0
  ];
  let kernelSize = 9;
  let magnifier = 2 - magnificationFactorSlider.value();

  shaderProgram.setUniform('uKernelSize', kernelSize);
  shaderProgram.setUniform('uKernel', kernel);
  shaderProgram.setUniform('uMagnifier', magnifier);

  rect(0, 0, img.width, img.height);


  if(keyIsPressed){
    if(key === '+'){
      magnificationFactorSlider.value(magnificationFactorSlider.value() + 0.01);
    }
    if(key === '-'){
      magnificationFactorSlider.value(magnificationFactorSlider.value() - 0.01);
    }
    if(keyCode === LEFT_ARROW){
      circleSizeSlider.value(circleSizeSlider.value() - 0.5);
    }
    if(keyCode === RIGHT_ARROW){
      circleSizeSlider.value(circleSizeSlider.value() + 0.5);
    }
  }
  
}
