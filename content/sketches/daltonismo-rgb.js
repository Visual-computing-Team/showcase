new p5((p) => {
  let imgChosen = null;
  do {
    imgChosen = window.localStorage.getItem("imgChosen");
  } while (imgChosen == null)

  let imgStorage = window.localStorage.getItem("photorgb");
  let img; // Declare variable for image

  p.preload = function () {
    // Load an image
    if(imgStorage != null)
      img = p.loadImage(imgStorage);
    else
      img = p.loadImage(`/showcase/sketches/images/${imgChosen}.png`);
  }

  p.setup = function () {
    setInterval(checkStorageValue, 1000); // check the storage value every second
    // Create a canvas
    p.createCanvas(700, 600);
    imgHeight = img.height * (p.width / 2) / img.width;
    p.resizeCanvas(p.width, imgHeight * 2 + 100);
    p.background(50, 60, 70);

    // Display original image
    p.textSize(20);
    p.fill(220);
    p.text("Visión normal", 10, 25);
    p.image(img, 4, 30 + 4, p.width / 2 - 5, imgHeight);

    // Display image for protanopia (red-green color blindness)
    let protanopiaImg = applyFilter('protanopia');
    p.textSize(20);
    p.fill(220);
    p.text("Protanopia", p.width / 2 + 10, 25);
    p.image(protanopiaImg, p.width / 2 + 3, 30 + 4, p.width / 2 - 6, imgHeight);

    // Display image for deuteranopia (red-green color blindness)
    let deuteranopiaImg = applyFilter('deuteranopia'); p.textSize(20);
    p.fill(220);
    p.text("Deuteranopia", 10, imgHeight + 75);
    p.image(deuteranopiaImg, 4, imgHeight + 50 + 35, p.width / 2 - 5, imgHeight);

    // Display image for tritanopia (blue-yellow color blindness)
    let tritanopiaImg = applyFilter('tritanopia');
    p.fill(220);
    p.text("Tritanopia", p.width / 2 + 10, imgHeight + 75);
    p.image(tritanopiaImg, p.width / 2 + 3, imgHeight + 50 + 35, p.width / 2 - 6, imgHeight);
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

  function getCookieValue(cookieName) {
    const cookies = document.cookie.split(";"); // split the cookie string into an array of cookies
    for (let i = 0; i < cookies.length; i++) {   // loop through the cookies array
      const cookie = cookies[i].trim();         // get the current cookie and remove any leading or trailing spaces
      if (cookie.startsWith(cookieName + "=")) {  // check if the cookie starts with the name we're looking for
        return cookie.substring(cookieName.length + 1, cookie.length);  // return the value of the cookie
      }
    }
    return "";  // return an empty string if the cookie is not found
  }

  function checkStorageValue() {
    let newCookieValue = window.localStorage.getItem("photorgb");
    if (newCookieValue !== imgStorage) {
      window.location.reload(); // reload the page if the cookie value has changed
    }
  }

}, "daltonismo");