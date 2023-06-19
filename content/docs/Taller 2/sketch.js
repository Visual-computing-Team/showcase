//new p5((p) => {
let numb, rad;
let isSliderClicked = false;
let isColorPickerClicked = false;
let canvasColors = [];

function setup() {
createCanvas(200, 200);
background(200);
noStroke();
colorPicker = createColorPicker('#26cced');
colorPicker.position(5, height + 5);
r_slider = createSlider(10, 200, 40);
r_slider.position(80, height + 10);
r_slider.style('width', '80px');

r_slider.mousePressed(function() {
  isSliderClicked = true;
});

r_slider.mouseReleased(function() {
  isSliderClicked = false;
});

colorPicker.mousePressed(function() {
  isSliderClicked = true;
});

colorPicker.mouseReleased(function() {
  isSliderClicked = false;
});

//setInterval(getActualColor, 40000);
}

function draw(){
if (!isSliderClicked && !isColorPickerClicked){
  //let currentColor = get(mouseX, mouseY);
  //currentColor = color(currentColor);
  //drawActualColor(currentColor);
  currentColor = getActualColor();
  drawActualColor(currentColor);
  let newColor = lerpColor(currentColor, colorPicker.color(), 0.5);
  //col = colorPicker.color();
  if (mouseIsPressed == true){
    fill(newColor.levels[0]+random(-25,25),newColor.levels[1]+random(-25,25),newColor.levels[2]+random(-25,25),6);
    for (i=0;i<3;i++){
      push();
      translate(mouseX,mouseY);
      rotate(random(PI*2));
      beginShape();
      for (m = 0; m < PI * 2; m += 1) {
        r = r_slider.value();
        let x = cos(m) * r;
        let y = sin(m) * r;
        vertex(x, y);
      }
      endShape(CLOSE);
      pop();
    }
  }
}
}

function drawActualColor(color){
  push();
  fill(color);
  stroke(0);
  strokeWeight(2);
  rect(10, 10, 50, 50);
  pop();
}

function getActualColor(){
let redTotal = 0;
let greenTotal = 0;
let blueTotal = 0;
canvasColors = [];

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let color = get(x, y);
    canvasColors.push(color);
  }
}

for (let i = 0; i < canvasColors.length; i++) {
  redTotal += red(canvasColors[i]);
  greenTotal += green(canvasColors[i]);
  blueTotal += blue(canvasColors[i]);
}

let redAvg = redTotal / canvasColors.length;
let greenAvg = greenTotal / canvasColors.length;
let blueAvg = blueTotal / canvasColors.length;

// Color nuevo: promedio de todos los canales (R, G, B)
let mixedColor = color(redAvg, greenAvg, blueAvg);

canvasColors = [];
console.log(mixedColor.toString("#rrggbb"))
return mixedColor;
}//}, "color-blending");