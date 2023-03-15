# Luminosidad

La luminosidad es la medida de intensidad lumínica por unidad de área de la luz viajando en una determinada dirección. Es decir, describe la cantidad de luz que pasa a través, es emitida o reflejada de un área particular.

La luminosidad de un color puede ser calculada a través de diferentes métodos tomando como base al modelo RGB.

{{< tabs "uniqueid" >}}
{{< tab "Luma" >}} 
Luma es la componente que codifica la información de luminosidad de la imagen. En términos generales, es algo muy similar a la versión en blanco y negro de la imagen original. Esta se puede calcular a partir de componentes RGB lineales

  {{< katex display>}}
  L=0.2126*R + 0.7152*G + 0.0722*B
  {{< /katex >}}

La fórmula refleja la función de eficiencia luminosa, ya que la luz "verde" es el componente principal de la luminancia, responsable de la mayoría de la luz percibida por los humanos, y la luz "azul" es el componente más pequeño. Se necesitan diferentes coeficientes lineales para determinar la luminancia para un espacio de color dado, que se calculan a partir de sus cromaticidades primarias (definidas por sus coordenadas de cromaticidad [Ver imagen #12, Marco Teórico: XYZ]).
{{< /tab >}}

{{< tab "HSV" >}}
El componente V, que es el determinante del brillo o valor de este modelo se define simplemente como el valor máximo de cualquiera de los tres componentes RGB del color; los otros dos componentes RGB se ignoran al determinar V.

  {{< katex display>}}
  V=max(R,G,B)
  {{< /katex >}}
{{< /tab >}}

{{< tab "HSL" >}} 
En el sistema HSL, el componente L es un promedio del valor RGB máximo y el valor RGB mínimo. 

  {{< katex display>}}
  L=\frac{max(R,G,B)+min(R,G,B)}{2}
  {{< /katex >}}
{{< /tab >}}

{{< tab "Percepciones de Luma" >}} 
La primera permite ver cuales combinaciones de colores de primer plano y de fondo proporcionan suficiente contraste cuando las vea alguien con déficit de color o cuando las vea en una pantalla en blanco y negro. 

  {{< katex display>}}
  L=\sqrt {0.299*R^2 + 0.587*G^2 + 0.114*B^2}
  {{< /katex >}}

En la segunda, las tres constantes (.299, .587 y .114) representan los diferentes grados en los que cada uno de los colores primarios (RGB) afecta la percepción humana del brillo general de un color.

  {{< katex display>}}
  L=0.299*R + 0.587*G + 0.114*B
  {{< /katex >}}

{{< /tab >}}

{{< /tabs >}}

Se presenta el cálculo de cada una de las fórmulas explicadas anteriormente, el cual toma los valores RGB y hace la conversión correspondiente:

```js
let lightnessModes = {
      intensity: (color) => {
        return (p.red(color) + p.green(color) + p.blue(color)) / 3;
      },
  
      hsv: (color) => {
        return Math.max((p.red(color), p.green(color), p.blue(color)))/0.255;
      },
  
      hsl: (color) => {
        let max = Math.max((p.red(color), p.green(color), p.blue(color)));
        let min = Math.min((p.red(color), p.green(color), p.blue(color)));
        return (max + min) / 2;
      },
  
      luma: (color) => {
        return (
          0.2126 * p.red(color) + 0.7152 * p.green(color) + 0.0722 * p.blue(color)
        );
      },

      perceived_luma: (color) =>{
        return (
            0.299 * p.red(color) + 0.587 * p.green(color) + 0.114 * p.blue(color)
          );
      },
      perceived2_luma: (color) =>{
        return (
            Math.sqrt(0.299 * p.red(color)^2 + 0.587 * p.green(color)^2 + 0.114 * p.blue(color)^2)
          );
      },
    };
```

Una vez realizado el cómputo, se procede a recorrer píxel a píxel la imagen para aplicar los cambios requeridos según el modelo escogido con la función `applyLightness`.


```js
    let applyLightness = (mode) => {
      // Extract the current function
      let lightness = lightnessModes[mode];
  
      // Go through each pixel
      for (let i = 0; i < originalImg.width; i++) {
        for (let j = 0; j < originalImg.height; j++) {
          let newPixel = lightness(originalImg.get(i, j));
          currentImg.set(i, j, p.color(newPixel));
        }
      }
    };
```
## Resultados y conclusiones

{{< p5-div sketch="/showcase/sketches/lightness.js" >}}

## Referencias

{{< hint danger >}}
 
HSP Color Model — Alternative to HSV (HSB) and HSL. (2006). Desarrollo Web. Recuperado de https://alienryderflex.com/hsp.html

Techniques For Accessibility Evaluation And Repair Tools (26 de abril de 2000). Más propiedades del color: tono, brillo y saturación. Envero. Recuperado de https://www.w3.org/TR/AERT/#color-contrast

Relative luminance. (30 de noviembre de 2022). Wikipedia. Recuperado de https://en.wikipedia.org/wiki/Relative_luminance

{{< /hint >}}



