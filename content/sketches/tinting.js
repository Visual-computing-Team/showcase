let img;
let blendShader, myshader, color, blendColorUniform, blendMode = 0;
let tintInput, sliderTransparent, sliderBrightness, blendModeSelect, tintRed, tintGreen, tintBlue;
let mixing = false, brightness = false;
let blendModes = ['ORIGINAL', 'MULTIPLY', 'ADD', 'DIFFERENCE', 'DARKEST', 'LIGHTLEST'];

function preload() {
  option = Math.floor(Math.random() * 2);
  if (option == 0)
    image = "image";
  else
    image = "colors";

  img = loadImage(`/showcase/sketches/images/${image}.jpg`);
  myshader = loadShader('/showcase/sketches/tintShader.vert', '/showcase/sketches/tintShader.frag');
}

function setup() {
  createCanvas(550, 550, WEBGL);
  textureMode(NORMAL);
  noStroke();
  
  blendColorUniform = myshader.uniforms["blendColor"];

  // Create the blend mode select input
  blendModeSelect = createSelect();
  blendModeSelect.position(10, 10);
  for (let i = 0; i < blendModes.length; i++) {
    blendModeSelect.option(blendModes[i]);
  }
  blendModeSelect.changed(updateBlendMode);

  // Create the checkbox and slider to mix 
  mixCheckbox = createCheckbox('Mixing', false);
  mixCheckbox.changed(mixingCheckboxEvent);

  sliderTransparent = createSlider(0, 1, 0.1, 0.1);
  sliderTransparent.position(90, height + 15);

  // Create the checkbox and slider to brightness
  brightCheckbox = createCheckbox('Brightness', false);
  brightCheckbox.changed(brightnessCheckboxEvent);

  sliderBrightness = createSlider(1, 255, 127, 1);
  sliderBrightness.position(100, height + 15);

  // Create the tint color input
  tintInput = createColorPicker('#FF0000');
  tintInput.position(130, 8);
}

function draw() {
  // Set the tint color based on the slider values
  tintRed = red(tintInput.color());
  tintGreen = green(tintInput.color());
  tintBlue = blue(tintInput.color());

  if (mixing) {
    color = [tintRed / 255.0, tintGreen / 255.0, tintBlue / 255.0, sliderTransparent.value()];
    sliderTransparent.show();
    blendModeSelect.hide();
    brightCheckbox.hide();
    blendMode = 6;
  } else if(brightness){
    let brightnessValue = sliderBrightness.value() / 255;
    color = [brightnessValue, brightnessValue, brightnessValue];
    blendMode = 1;

    tintInput.hide();
    blendModeSelect.hide();
    mixCheckbox.hide();
    sliderTransparent.hide();
    sliderBrightness.show();
  }else {
    color = [tintRed / 255.0, tintGreen / 255.0, tintBlue / 255.0];
    sliderTransparent.hide();
    sliderBrightness.hide();
    blendModeSelect.show();
    tintInput.show();
    mixCheckbox.show();
    brightCheckbox.show();
  }

  // Pass image and tint color to the shader as uniforms
  myshader.setUniform('tex0', img);
  myshader.setUniform('blendColor', color);
  myshader.setUniform('blendMode', blendMode);

  // Draw the image using the shader
  shader(myshader);

  // Render the image on a quad
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);

}

function mixingCheckboxEvent() {
  mixing = this.checked();

  if(!mixing){
    blendMode = blendModes.indexOf(blendModeSelect.value());
  }
}

function brightnessCheckboxEvent() {
  brightness = this.checked();

  if(!brightness){
    blendMode = blendModes.indexOf(blendModeSelect.value());
  }
}
function updateBlendMode() {
  // Update the blend mode based on the selected option
  blendMode = blendModes.indexOf(blendModeSelect.value());
}

