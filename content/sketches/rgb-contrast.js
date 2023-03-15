new p5((p) => {
  let imgChosen = Math.floor(Math.random()*10);
  window.localStorage.setItem("imgChosen", imgChosen)
  let img;

  p.preload = function () {
    img = p.loadImage(`/showcase/sketches/images/${imgChosen}.png`);
  }

  p.setup = function () {
    p.createCanvas(700, 600);
    imgHeight = img.height * (p.width / 2) / img.width;

    //Show original image
    p.resizeCanvas(p.width, imgHeight + 30);
    p.colorMode(p.RGB);
    p.background(25);
    p.image(img, 2, 2, p.width / 2 - 3, imgHeight);

    p.textSize(20);
    p.fill(220);
    p.text("Imagen original", 10, imgHeight + 20);

    img.loadPixels();

    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let pixelIndex = (x + y * img.width) * 4;
        let r = img.pixels[pixelIndex];
        let g = img.pixels[pixelIndex + 1];
        let b = img.pixels[pixelIndex + 2];

        // correct daltonism using RGB contrast method
        let rgContrast = 2.6;
        let rAdjusted = Math.pow((r / 255), rgContrast) * 255;
        let gAdjusted = Math.pow((g / 255), rgContrast) * 255;

        img.pixels[pixelIndex] = rAdjusted;
        img.pixels[pixelIndex + 1] = gAdjusted;
        img.pixels[pixelIndex + 2] = b;
      }
    }

    img.updatePixels();

    //Show adjusted image
    p.image(img, p.width / 2 + 1, 2, p.width / 2 - 3, imgHeight);
    p.textSize(20);
    p.fill(220);
    p.text("Imagen corregida (Contraste RGB)", p.width / 2 + 10, imgHeight + 20);

  }


}, "rgbcontrast");