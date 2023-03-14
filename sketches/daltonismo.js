new p5((p) => {
  let img; // Declare variable for image
  let imgWidth = 400;
  let imgHeight = 400;

  p.preload = function() {
    // Load an image
    img = p.loadImage('/showcase/sketches/images/new29.png');
  }

  p.setup = function() {
    // Create a canvas
    p.createCanvas(img.width*2, img.height*2);

    // Display original image
    p.image(img, 0, 0, img.width/2, img.height/2);

    // Display image for protanopia (red-green color blindness)
    let protanopiaImg = applyFilter('protanopia');
    p.image(protanopiaImg, p.width / 2, 0, img.width/2, img.height/2);

    // Display image for deuteranopia (red-green color blindness)
    let deuteranopiaImg = applyFilter('deuteranopia');
    p.image(deuteranopiaImg, 0, p.height / 4, img.width/2, img.height/2);

    // Display image for tritanopia (blue-yellow color blindness)
    let tritanopiaImg = applyFilter('tritanopia');
    p.image(tritanopiaImg, p.width / 4, p.height / 4,  img.width/2, img.height/2);
  }

  function applyFilter(filterType) {
    // Create a new p5.Image object to store the filtered image
    let filteredImg = p.createImage(img.width, img.height);

    // Load the original image's pixels
    img.loadPixels();
    filteredImg.loadPixels();

    // Loop through each pixel in the image
    for (let i = 0; i < img.pixels.length; i += 4) {
      // Get the RGB values for the current pixel
      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];

      // Apply the appropriate filter to the pixel based on the filterType parameter
      if (filterType === 'protanopia') {
        r = 0.567 * r + 0.433 * g + 0;
        g = 0.558 * r + 0.442 * g + 0;
        b = 0 + 0 + 1 * b;
      } else if (filterType === 'deuteranopia') {
        r = 0.625 * r + 0.375 * g + 0;
        g = 0.7 * r + 0.3 * g + 0;
        b = 0 + 0 + 1 * b;
      } else if (filterType === 'tritanopia') {
        r = 0.95 * r + 0.05 * g + 0;
        g = 0 + 0.433 * g + 0.567 * b;
        b = 0 + 0.475 * g + 0.525 * b;
      }

      // Set the filtered pixel's RGB values
      filteredImg.pixels[i] = r;
      filteredImg.pixels[i + 1] = g;
      filteredImg.pixels[i + 2] = b;
      filteredImg.pixels[i + 3] = 255; // Set alpha value to 255 (fully opaque)
    }

    // Update the filtered image's pixels and return it
    filteredImg.updatePixels();
    return filteredImg;
  }

}, "colors");