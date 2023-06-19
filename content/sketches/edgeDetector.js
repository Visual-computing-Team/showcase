let img;
let shaderProgram, maskType, kernelSize = 3;
let circlePosition;
let circleSizeSlider;
let circleRadius = 100;
let effectIntensity = 0.5; // Initial effect intensity value
let maskTypes = ['LAPLACIAN OF GAUSSIAN', 'LAPLACIAN', 'SORBEL', 'KIRSCH', 'ROBINSON', 'ROBERTS', 'WITHOUT MASK'];
let maskTypes2 = ['HSV', 'RGB', 'LUMA'];

function preload() {
  img = loadImage('/showcase/sketches/images/fire.jpg');
  shaderProgram = loadShader('/showcase/sketches/edgeDetector.vert', '/showcase/sketches/edgeDetector.frag');
}

function setup() {
  createCanvas(540 * img.width / img.height, 540, WEBGL);
  noStroke();
  shader(shaderProgram);
  shaderProgram.setUniform('uSampler', img);
  shaderProgram.setUniform('uResolution', [width * pixelDensity(), height * pixelDensity()]);
  shaderProgram.setUniform('uApplyEffect', 0); // Set to 0 to show the original image


  // Create the circle size slider
  circleSizeSlider = createSlider(50, 400, 100, 1);
  circleSizeSlider.position(10, 10);

  // Create the effect intensity slider
  effectSlider = createSlider(0, 1, 0.2, 0.005);
  effectSlider.position(10, 30);

  circlePosition = createVector(width / 2, height / 2); // Set initial circle position to the center of the canvas

  // Create radio for masks types
  radio = createRadio();
  radio.option(1, 'Edge-detector');
  radio.option(2, 'Brightness');
  radio.changed(updateRadioSelection);
  textAlign(CENTER);
  fill(255, 0, 0);


  // Create the edge-detection mask type select input
  maskTypeSelect = createSelect();
  maskTypeSelect.position(230, height + 15);
  for (let i = 0; i < maskTypes.length; i++) {
    maskTypeSelect.option(maskTypes[i]);
  }
  maskTypeSelect.changed(updateMaskType);
  maskTypeSelect.hide();

  // Create the brightness mask type select input
  maskTypeSelect2 = createSelect();
  maskTypeSelect2.position(230, height + 15);
  for (let i = 0; i < maskTypes2.length; i++) {
    maskTypeSelect2.option(maskTypes2[i]);
  }
  maskTypeSelect2.changed(updateMaskType2);
  maskTypeSelect2.hide();
}

function draw() {
  // Update the circle position based on mouse input
  let circleCenter = [mouseX * pixelDensity(), mouseY * pixelDensity()];

  shaderProgram.setUniform('effectType', radio.value());
  shaderProgram.setUniform('maskType', maskType);



  // Pass circle position, radius, and effect intensity to the shader
  shaderProgram.setUniform('uCirclePosition', circleCenter);
  shaderProgram.setUniform('uCircleRadius',circleSizeSlider.value());
  shaderProgram.setUniform('uEffectIntensity', effectSlider.value());
  shaderProgram.setUniform('uApplyEffect', 1);
  shaderProgram.setUniform('kernelSize', kernelSize);
  rect(0, 0, width, height);

  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW) {
      circleSizeSlider.value(circleSizeSlider.value() - 1);
    }
    if (keyCode === RIGHT_ARROW) {
      circleSizeSlider.value(circleSizeSlider.value() + 1);
    }
    if (key === '+') {
      effectSlider.value(effectSlider.value() + 0.005);
    }
    if (key === '-') {
      effectSlider.value(effectSlider.value() - 0.005);
    }

    effectIntensity = constrain(effectIntensity, 0, 1);
  }
}


function keyPressed() {
  if (key === '3') {
    kernelSize = 3;
  }
  if (key === '5') {
    kernelSize = 5;
  }
  if (key === '7') {
    kernelSize = 7;
  }
  if (key === '9') {
    kernelSize = 9;
  }
}

function updateMaskType() {
  // Update the blend mode based on the selected option
  maskType = maskTypes.indexOf(maskTypeSelect.value());
}

function updateMaskType2() {
  // Update the blend mode based on the selected option
  maskType = maskTypes2.indexOf(maskTypeSelect2.value());
}

function updateRadioSelection(){
  if(radio.value() == 1){
    updateMaskType();
    maskTypeSelect.show();
    maskTypeSelect2.hide();
  }else if(radio.value() == 2){
    updateMaskType2();
    maskTypeSelect2.show();
    maskTypeSelect.hide();
  }
}