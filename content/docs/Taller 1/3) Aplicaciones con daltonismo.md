
# Aplicaciones con daltonismo

## Selección de la imagen

A continuación puede ingresar la URL de la imagen que desea procesar


{{< p5-iframe sketch="/showcase/sketches/text-input.js" width="735" height="65" >}}

## Simulación de daltonismo
Para realizar una simulación del daltonismo sobre una imagen se realiza un procesado a través del cual se le aplica un determinado filtro para cada uno de los tipos de daltonismo tratados (Protanopia, deuteranopia y tritanopia).

Para aplicar un filtro se recorre cada uno de los pixeles de la imagen y se obtienen sus valores para los canales RGB (rojo, verde, azul). Posteriormente para cada pixel se realiza un ajuste en cada canal modificando su valor para que una persona con percepción del color normal lo perciba como lo hace una persona daltónica.

Por ejemplo en el caso del filtro para simular protanopia los canales de color varían de la siguiente manera:
+ Canal rojo (r): se reduce a 0.567 veces su valor original, mientras que el canal verde (g) se aumenta a 0.433 veces su valor original. Esto refleja el hecho de que las personas con protanopia tienen dificultades para distinguir entre el rojo y el verde.
+ Canal verde (g): también se reduce a 0.442 veces su valor original, mientras que el canal rojo (r) se aumenta a 0.558 veces su valor original. Esto ayuda a equilibrar el ajuste realizado en los canales rojo y verde en el paso anterior.
+ Canal azul (b): se deja sin cambios, ya que la protanopia no afecta la percepción del azul.

De igual forma se realiza la modificación para los otros tipos de daltonismo. Estos valores de modificación corresponden a la sensibilidad relativa entre la persona con daltonismo y la persona de visión normal.

{{< details title="Simulación de daltonismo" open=false >}}
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

{{< p5-iframe sketch="/showcase/sketches/daltonismo.js?version=5" width="735" height="800" >}}
## Corrección con el método de contraste RGB

A continuación se presenta una primera aproximación para la corrección de daltonismo en la imagen usando el método de contraste RGB, que implica ajustar los valores de los canales rojo y verde de cada píxel de la imagen utilizando una constante (llamada rgContrast en el código). Se aplica una función de potencia a los valores de los canales rojo y verde para ajustar su valor y, finalmente, se asignan los valores ajustados de los canales rojo y verde al píxel actual y se mantiene sin cambios el valor del canal azul.

La constante rgContrast se utiliza para ajustar el contraste entre los canales rojo y verde de manera que se puedan distinguir mejor. El valor de 2.6 se ha determinado empíricamente y se ha demostrado que funciona bien para corregir algunos tipos de daltonismo, principalmente protanopia y deuteranopia.

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

{{< p5-iframe sketch="/showcase/sketches/rgb-contrast.js?version=4" width="735" height="400" >}}

Ahora, se presenta la simulación de los 3 tipos de daltonismo luego de procesar la imagen a través del método de contraste RGB.

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

{{< p5-iframe sketch="/showcase/sketches/daltonismo-rgb.js?version=4" width="735" height="800" >}}

## Corrección con el método de contraste HSV

Una segunda aproximación para corregir el daltonismo es usando el método de contraste HSV. Inicialmente se procesa la imagen para pasarla del modelo de color RGB al modelo de color HSV. Entonces, se modifican los valores de matiz (H), saturación (S) y Valor o Brillo (V) en los colores de la imagen para hacerlos más distinguibles para personas con daltonismo.

En general, se varía el nivel de matíz para llevar a valores similares los colores rojos y verdes, la saturación y el brillo se reducen para que los colores sean más apagados y oscuros.
#### Ajuste de matiz
El ajuste se realiza utilizando una fórmula que involucra una constante "m" (que en este caso es 1.8465) y el rango de valores de matiz que corresponden a ciertas regiones de color. El valor de matiz se ajusta primero para que esté dentro del rango de 0 a 359 grados utilizando el operador módulo y estructuras de control if. Luego, el valor de matiz ajustado se pasa por la fórmula basada en la región en la que cae el valor de matiz:

+ Si el valor de matiz está entre 0 y 60 grados o entre 170 y 270 grados, se divide por m.
+ Si el valor de matiz está entre 60 y 170 grados o entre 270 y 360 grados, se desplaza 60 grados y luego se divide por m.

Después de aplicar la fórmula, se redondea el valor resultante al entero más cercano y se verifica que esté dentro del rango de 0 a 359 grados. Si es menor que 0, se le suma 360 grados; si es mayor que 359, se le resta 360 grados. Finalmente, la función devuelve el valor de matiz ajustado.
#### Conversión de RGB a HSV
Se toma como entrada un valor RGB y se descompone en sus componentes rojo, verde y azul (r, g, b). Luego, se determina el valor máximo y mínimo de los componentes RGB para calcular el rango de diferencia (delta) entre ellos.

A continuación, se calcula el valor de la saturación y el valor de brillo a partir de los valores máximo y mínimo, y se determina el valor del tono en función de los valores de r, g y b y de la posición de éstos dentro del rango de diferencia. La fórmula utilizada para calcular el tono es diferente dependiendo del valor máximo.

##### Conversión de HSV a RGB
Se comienza extrayendo los valores de h, s y v del valor hsv. Luego, se utilizan una serie de cálculos para determinar los valores de rojo, verde y azul que representan el color en formato RGB. Estos cálculos implican la conversión de la matiz de un ángulo a un índice en una escala de 6, y la utilización de esa escala para determinar los valores de rojo, verde y azul basados en los valores de saturación y valor.

{{< details title="Corrección con el método de contraste HSV" open=false >}}
```js
//Convert rgb value to hsv
function rgbToHsv(rgb) {
  let r = red(rgb);
  let g = green(rgb);
  let b = blue(rgb);

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

//Convert hsv to rgb
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

//Go throw the image to change the pixels value
for (let x = 0; x < img.width; x++) {
  for (let y = 0; y < img.height; y++) {
      let pixel = img.get(x, y); // get the color of the pixel in the original image
      let hsv = RGBToHsv(pixel); // convert the color from RGB to HSV

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

{{< p5-iframe sketch="/showcase/sketches/hsv-contrast.js?version=3" width="735" height="400" >}}

Finalmente, se presenta la simulación de daltonismo con la imagen corregida luego de ser procesada mediante el método de corrección HSV

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

{{< p5-iframe sketch="/showcase/sketches/daltonismo-hsv.js?version=4" width="735" height="800" >}}


## Conclusiones
{{< hint info >}}
  La simulación de daltonismo realiza una correcta presentación de los 3 tipos de daltonismo planteados. Permite apreciar la baja sensibilidad a los colores según el tipo de anomalía visual, con lo cual se puede comprender un poco mejor el cómo ve una persona con una de estas afecciones.

  Las dos aproximaciones de corrección del daltonismo funcionan en un nivel básico. En gran parte de las imágenes presentadas se logran diferenciar mejor los elementos que las componen. Sin embargo, se encontró que el método de contraste RGB se desempeña un poco mejor con fotografías, y el método de constraste HSV presenta un mejor resultado en imágenes planas como los [tests de ishihara](https://es.wikipedia.org/wiki/Cartas_de_Ishihara).
{{< /hint >}}



## Referencias
{{< hint danger >}}
  El código antes presentado fue realizado en colaboración con la herramienta de procesado de lenguaje Chat GPT

{{< /hint >}}



