new p5((p) => {
  let img;
  let smallImage;
  let scl = 20;
  let images = [];
  let brightnessVal = [];

  function preload() {
    img = p.loadImage('/showcase/sketches/historical_img/shitzu_lindo.jpg');
    for (let x = 0; x <= 10; x++) {
      images[x] = p.loadImage('/showcase/sketches/historical_img/' + p.str(x) + '.jpg');
    }
  }

  //Se cambia la imagen con el botón r
  function keyPressed() {
    if (p.key === 'r') {
      let randomIndex = Math.floor(p.random(images.length));
      img = p.loadImage('/showcase/sketches/historical_img/' + String(randomIndex) + '.jpg');
    }
    img.resize(400, 400);
  }

  function setup() {
    p_slider = p.createSlider(1, 100, 1);
    p.createCanvas(400, 400);
    img.resize(400, 400);

    /* Valores del brillo */
    for (let x = 0; x <= 10; x++) {
      let avg = 0;
      images[x].loadPixels();
      for (let i = 0; i < images[x].pixels.length; i += 4) {
        let b = p.brightness(p.color(images[x].pixels[i], images[x].pixels[i + 1], images[x].pixels[i + 2]));
        avg += b;
      }
      avg = avg / (images[x].pixels.length / 4);
      brightnessVal[x] = avg;
    }
  }

  function draw() {
    /*redimension values*/
    scl = p_slider.value();
    let w = p.int(img.width / scl);
    let h = p.int(img.height / scl);
    smallImage = p.createImage(w, h);
    smallImage.copy(img, 0, 0, img.width, img.height, 0, 0, w, h);

    /* photomosaic */
    smallImage.loadPixels();
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        let index = (i + j * w) * 4;
        let r = smallImage.pixels[index];
        let g = smallImage.pixels[index + 1];
        let b = smallImage.pixels[index + 2];
        let bright = p.brightness(p.color(r, g, b));
        let min = 255;
        let minIndex = 0;
        for (let x = 0; x <= 10; x++) {
          if (p.abs(brightnessVal[x] - bright) < min) {
            min = p.abs(brightnessVal[x] - bright);
            minIndex = x;
          }
        }
        p.image(images[minIndex], i * scl, j * scl, scl, scl);
      }
    }
  }

  p.preload = preload;
  p.setup = setup;
  p.draw = draw;
  p.keyPressed = keyPressed;
}, "photoMosaic");
