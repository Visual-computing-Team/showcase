
## Color Blindness

### Corrección RGB

{{< details title="Corrección con el método de contraste RGB" open=false >}}
```js
for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let pixelIndex = (x + y * img.width) * 4;
      let r = img.pixels[pixelIndex];
      let g = img.pixels[pixelIndex + 1];
      let b = img.pixels[pixelIndex + 2];

      // correct daltonism using RGB contrast method
      let rgContrast = 2.6;
      let rAdjusted = Math.pow((r/255), rgContrast) * 255;
      let gAdjusted = Math.pow((g/255), rgContrast) * 255;

      img.pixels[pixelIndex] = rAdjusted;
      img.pixels[pixelIndex + 1] = gAdjusted;
      img.pixels[pixelIndex + 2] = b;
    }
  }
```
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/rgb-contrast.js?version=2" width="735" height="400" >}}

{{< details title="Simulación de daltonismo con la corrección RGB" open=false >}}
```js
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
```
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/daltonismo-rgb.js?version=3" width="735" height="800" >}}

### Corrección HSV

{{< details title="Corrección con el método de contraste HSV" open=false >}}
```js
//Go throw the image to change the pixels value
for (let x = 0; x < img.width; x++) {
  for (let y = 0; y < img.height; y++) {
      let pixel = img.get(x, y); // get the color of the pixel in the original image
      let hsv = rgbToHsv(pixel); // convert the color from RGB to HSV

      // adjust the hue, saturation, and value values based on the type of daltonism
      // for example, for protanopia, we need to shift the hue towards blue
      hsv.h = adjustHueForProtanopia(hsv.h);
      hsv.s = adjustSaturationForProtanopia(hsv.s);
      hsv.v = adjustValueForProtanopia(hsv.v);

      let correctedPixel = hsvToRgb(hsv); // convert the color back to RGB
      correctedImg.set(x, y, correctedPixel); // set the corrected pixel color in the new image
  }

  //Functions to adjust the values of HSV model for protanopia
  function adjustHueForProtanopia(hue) {
        const m = 1.8465;
        const maxHue = 359;
        const minHue = 0;

        hue = hue % 360;
        if (hue < 0) {
            hue += 360;
        }

        let result;
        if (hue >= minHue && hue < 60) {
            result = hue / m;
        } else if (hue >= 60 && hue < 170) {
            result = 60 + (hue - 60) / m;
        } else if (hue >= 170 && hue < 270) {
            result = hue / m;
        } else {
            result = 60 + (hue - 360 + 170) / m;
        }

        result = Math.round(result);
        if (result < minHue) {
            result += 360;
        } else if (result > maxHue) {
            result -= 360;
        }

        return result;
    }

    function adjustSaturationForProtanopia(saturation) {
        const m = 1.3;
        const maxSaturation = 1;
        const minSaturation = 0;

        let result;
        if (saturation < 0.1) {
            result = saturation;
        } else if (saturation <= 0.8) {
            result = saturation ** m;
        } else {
            result = maxSaturation;
        }

        return result;
    }

    function adjustValueForProtanopia(value) {
        const m = 0.4;
        const maxVal = 1;
        const minVal = 0;

        let result;
        if (value < 0.1) {
            result = value;
        } else {
            result = value ** m;
        }

        result = Math.max(minVal, Math.min(maxVal, result));

        return result;
    }
}
```
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/hsv-contrast.js" width="735" height="400" >}}

{{< details title="Simulación de daltonismo con la corrección HSV" open=false >}}
```js
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
```
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/daltonismo-hsv.js?version=3" width="735" height="800" >}}
