new p5((p) => {
  let img;
  let canvas;

  let effectIndex = 0; // Variable para controlar el efecto activo

  function preload() {
    img = p.loadImage('/showcase/sketches/img_soft/shitzu_lindo.jpg');
  }

  function setup() {
    p.createCanvas(400, 400);
    img.resize(400, 400);
    p.noLoop();
  }

  function draw() {
    p.background(220);
    p.image(img, 0, 0);

    switch (effectIndex) {
      case 0:
        applyEffect1();
        break;
      case 1:
        applyEffect2();
        break;
      case 2:
        applyEffect3();
        break;
      default:
        break;
    }
  }

  function applyEffect1() {
    img.resize(400, 400);
    p.image(img, 0, 0);

    for (let i = 0; i < p.width; i += 10) {
      let stripeXPosition = p.int(p.random(0, img.width - 10));
      let stripeX = img.get(stripeXPosition, 0, 10, img.height);
      p.image(stripeX, i, 0);
    }
  }

  function applyEffect2() {
    img.resize(p.width, p.height);
    p.image(img, 0, 0);

    const range = 250;
    for (let i = 0; i < p.height; i++) {
      for (let j = 0; j < p.width; j++) {
        const pixelColor = img.get(i + p.random(range), j + p.random(range));
        p.stroke(pixelColor);
        p.point(i, j);
      }
    }
  }

  function applyEffect3() {
    let resultImg = p.createGraphics(img.width, img.height);

    for (let col = 0; col < img.width; col++) {
      for (let row = 0; row < img.height; row++) {
        let xPos = p.random(col);
        let yPos = p.random(row);

        let c = img.get(xPos, yPos);
        resultImg.noFill();
        resultImg.strokeWeight(p.random(5));
        resultImg.stroke(p.color(c));
        resultImg.curve(
          xPos + p.random(160),
          yPos + p.random(90),
          xPos - p.random(90),
          yPos - p.random(160),
          xPos + p.random(160),
          yPos + p.random(90),
          xPos - p.random(90),
          yPos - p.random(160)
        );
      }
    }

    p.image(resultImg, 0, 0);
  }

  function keyPressed(event) {
    if (event.keyCode === 49) { // Tecla "1"
      effectIndex = 0;
      p.redraw();
    } else if (event.keyCode === 50) { // Tecla "2"
      effectIndex = 1;
      p.redraw();
    } else if (event.keyCode === 51) { // Tecla "3"
      effectIndex = 2;
      p.redraw();
    }
  }

  p.preload = preload;
  p.setup = setup;
  p.draw = draw;
  p.keyPressed = keyPressed;
}, "software_posteffects");
