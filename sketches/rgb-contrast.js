new p5((p) => {
  let imgChosen = null;
    do {
      imgChosen = window.localStorage.getItem("imgChosen");
    } while (imgChosen == null)

  let imgCookie = getCookieValue("photo");
  console.log(`PHOTOOO COOOKIEEE: ${imgChosen}`)

  let img;

  p.preload = function () {
    if(imgCookie != "")
      img = p.loadImage(imgCookie, null, ()=>{window.location.reload()});
    else
      img = p.loadImage(`/showcase/sketches/images/${imgChosen}.png`);

  }

  p.setup = function () {
    setInterval(checkCookieValue, 1000); // check the cookie value every second
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

    
    //save image in localstorage
    
    imgClone = img.get();
    let imgData = p.getImageData(imgClone);
    localStorage.setItem("photorgb", imgData);
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

  function checkCookieValue() {
    let newCookieValue = getCookieValue("photo");
    let newimgChosen = window.localStorage.getItem("imgChosen");
    if (newCookieValue !== imgCookie || newimgChosen != imgChosen) {
      window.location.reload(); // reload the page if the cookie value has changed
    }
  }

  p.getImageData = function(image) {
    // get the image data as a Base64-encoded string
    let imgData = image.canvas.toDataURL();
    return imgData;
  }

}, "rgbcontrast");