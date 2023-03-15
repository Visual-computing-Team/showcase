new p5((p) => {
    let imgChosen = null;
    do {
        imgChosen = window.localStorage.getItem("imgChosen");
    } while (imgChosen == null)
    let img; // declare global variable for the image

    p.preload = function () {
        img = p.loadImage(`/showcase/sketches/images/${imgChosen}.png`); // load the image
    }

    p.setup = function () {
        p.createCanvas(700, 600);
        imgHeight = img.height * (p.width / 2) / img.width;

        //Display the original image
        p.resizeCanvas(p.width, imgHeight + 30);
        p.colorMode(p.RGB);
        p.background(25);
        p.image(img, 2, 2, p.width / 2 - 3, imgHeight);

        p.textSize(20);
        p.fill(220);
        p.text("Imagen original", 10, imgHeight + 20);

        let correctedImg = p.createImage(img.width, img.height); // create a new image for the corrected version
        correctedImg.loadPixels(); // load the pixels for manipulation

        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                let pixel = img.get(x, y); // get the color of the pixel in the original image
                let hsv = rgbToHsv(pixel); // convert the color from RGB to HSV

                // adjust the hue, saturation, and value values based on the type of daltonism
                // for example, for protanopia, we need to shift the hue towards blue
                // for deuteranopia, we need to shift the hue towards red
                // and for tritanopia, we need to shift the hue towards green
                // these shifts are determined based on research and experimentation, and may vary depending on the individual
                hsv.h = adjustHueForProtanopia(hsv.h);
                hsv.s = adjustSaturationForProtanopia(hsv.s);
                hsv.v = adjustValueForProtanopia(hsv.v);

                let correctedPixel = hsvToRgb(hsv); // convert the color back to RGB
                correctedImg.set(x, y, correctedPixel); // set the corrected pixel color in the new image
            }
        }

        correctedImg.updatePixels(); // update the pixels in the corrected image

        //Display the corrected image
        p.image(correctedImg, p.width / 2 + 1, 2, p.width / 2 - 3, imgHeight);
        p.textSize(20);
        p.fill(220);
        p.text("Imagen corregida (Contraste HSV)", p.width / 2 + 10, imgHeight + 20);
    }

    // helper functions to convert between RGB and HSV color spaces

    function rgbToHsv(rgb) {
        let r = p.red(rgb);
        let g = p.green(rgb);
        let b = p.blue(rgb);

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let delta = max - min;

        let h, s, v;

        if (max === 0) {
            s = 0;
        } else {
            s = delta / max;
        }

        if (delta === 0) {
            h = 0;
        } else {
            if (r === max) {
                h = (g - b) / delta;
            } else if (g === max) {
                h = 2 + (b - r) / delta;
            } else {
                h = 4 + (r - g) / delta;
            }
            h *= 60;
            if (h < 0) h += 360;
        }

        v = max;

        return { h, s, v };
    }

    function hsvToRgb(hsv) {
        let h = hsv.h;
        let s = hsv.s;
        let v = hsv.v;

        let r, g, b;

        let i = Math.floor(h / 60);
        let f = h / 60 - i;
        let pp = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);

        switch (i) {
            case 0:
                r = v;
                g = t;
                b = pp;
                break;
            case 1:
                r = q;
                g = v;
                b = pp;
                break;
            case 2:
                r = pp;
                g = v;
                b = t;
                break;
            case 3:
                r = pp;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = pp;
                b = v;
                break;
            case 5:
                r = v;
                g = pp;
                b = q;
                break;
        }
        return p.color(r * 255, g * 255, b * 255);
    }

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


}, "hsvcontrast");