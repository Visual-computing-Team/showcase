# 🎨 **Color Blending**

{{< hint danger >}}
<b> Consigna </b>

Averigüe el código `js` de los bocetos anteriores.

{{< /hint >}}

## **Marco teórico** 📕

### **¿Qué es el Color blending?** ❓

El "color blending" se refiere al proceso de combinar o mezclar colores para crear nuevos colores o efectos visuales. En la programación y los gráficos, el color blending se utiliza para mezclar colores en diferentes formas, como la interpolación lineal entre dos colores, la combinación de colores mediante operaciones matemáticas, o la aplicación de efectos de transparencia y opacidad.

### **Usos del Color Blending** 🖼️

El color blending es ampliamente utilizado en la creación de efectos visuales, como transiciones suaves entre colores, sombreado y realce en gráficos 3D, y la creación de gradientes y degradados. También es fundamental en la creación de arte digital y diseño gráfico, ya que permite la mezcla y combinación de colores para lograr la apariencia deseada.

### ***Color blending* multiplicativo** 🍭

En el color blending multiplicativo, cada componente de color (rojo, verde, azul) de los píxeles de origen y destino se multiplica para obtener el componente resultante. Esto significa que los valores de los píxeles se multiplican entre sí en lugar de sumarse.

El proceso de multiplicación se realiza canal por canal para cada componente de color. Por ejemplo, si tienes un píxel de origen con el color (R1, G1, B1) y un píxel de destino con el color (R2, G2, B2), el color resultante sería:

{{< katex display>}}
R={R_1 * R_2}
{{< /katex >}}

{{< katex display>}}
G={G_1 * G_2}
{{< /katex >}}

{{< katex display>}}
B={B_1 * B_2}
{{< /katex >}}

Esto puede resultar en una apariencia más oscura o más saturada, dependiendo de los colores de origen y destino.

La multiplicación de colores se utiliza a menudo en técnicas de mezcla de imágenes y efectos visuales. Por ejemplo, se puede utilizar para simular la interacción de luces de diferentes colores en una escena o para crear efectos de iluminación y sombras más realistas. También se utiliza en operaciones de fusión de capas en programas de edición de imágenes y software de composición.

{{< hint info >}}
Es importante destacar que el resultado del ***color blending multiplicativo*** puede estar limitado por el rango de valores permitido para cada componente de color (generalmente de 0 a 1 o de 0 a 255, dependiendo del contexto). Si el resultado de la multiplicación excede este rango, es posible que deba aplicarse una **normalización** o ajuste para mantener los valores dentro de los límites adecuados.

{{< /hint >}}

### ***Fragment shader*** ⛱️
Es un tipo de shader en los gráficos por computadora que se utiliza en el proceso de renderización para calcular el color y otros atributos de cada fragmento o píxel de una imagen o superficie 3D.

Un fragmento se refiere a un punto en la pantalla o en una superficie 3D que se va a colorear o procesar. Los fragment shaders son pequeños programas escritos en un lenguaje de sombreado (en este caso, WEBGL) que se ejecutan para cada fragmento durante el proceso de renderización.

{{< hint warning >}}
El fragment shader trabaja en colaboración con el vertex shader, que se encarga de calcular la posición y otros atributos de los vértices de los objetos en una escena 3D. Juntos, el vertex shader y el fragment shader permiten la manipulación y el procesamiento de la geometría y el color de los objetos en un entorno gráfico.
{{< /hint >}}

En el caso de color blending, utilizamos 2 fragment shaders:

{{< tabs "uniqueid" >}}
{{< tab "Multiplicativo" >}}
    La multiplicación de uMaterial1 y uMaterial2 se realiza componente por 
    componente, lo que significa que se multiplican los valores de cada 
    componente (rojo, verde, azul y alfa) de ambos materiales. El resultado es 
    un nuevo color resultante que se asigna al fragmento actual.
<div style = "
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    ">
    
```js
precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = uMaterial1 * uMaterial2;
}
```
</div>

{{< /tab >}}

{{< tab "Brillo" >}}
    Este realiza una operación de mezcla de color y ajuste de brillo. El color 
    resultante se puede modular aún más multiplicándolo por un brillo dado.
    El resultado se asigna al color del fragmento de salida. 
<div style = "
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    ">
    
```js
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  vec4 material = uMaterial1 * uMaterial2;
  gl_FragColor = vec4(brightness * material.rgb, material.a);
}
```
</div>

{{< /tab >}}

{{< /tabs >}}

{{< details title="Explicación de las variables de los *fragment shaders*" open=false >}}
🔸 **Variables uniformes:** son valores que se proporcionan externamente al shader y se mantienen constantes durante la ejecución del mismo.

🔸`gl_FragColor`**:** es la asignación del color resultante al fragmento actual. En el caso del fragment shader para aplicar el brillo, el valor de este se aplica solo a los componentes RGB del color, no al canal alfa (transparencia).

{{< hint danger >}}
Normalmente, no se desea cambiar la opacidad de un píxel mediante ajustes de brillo, ya que el canal alfa es utilizado para efectos de transparencia en composiciones de capas y renderizado de objetos semitransparentes.
{{< /hint >}}
{{< /details >}}

## **Resultados** 🔍
Se creó un lienzo en 3D donde se pueden mezclar y visualizar diferentes colores utilizando distintos modos de mezcla y ajustes de brillo. Se realiza la representación de los objetos que, en este caso, serían los selectores de color para empezar a hacer las mezclas y se actualizan los uniformes del shader para reflejar los colores y el brillo seleccionados. Como se mencionó anteriormente, los fragment shaders comúnmense vienen acompañados de los vertex shader; es por ellos que se utilizan las funciones `beginShape()` y `vertex()` para definir los vértices de los objetos y `endShape()` para finalizar su dibujo.

{{< details title="Código fuente" open=false >}}
```js
function draw() {
    let padding = 0.1;
    let width = 0.55;
    let height = 1;

    let color1Color = color1.color();
    let color2Color = color2.color();

    background(0);

    // Primer  color a mezclar 
    blendShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
    blendShader.setUniform('uMaterial2', identity);
    blendShader.setUniform('brightness', 1.0);
    
    beginShape();
    vertex(-(width+(width/2) + padding), height/2, 0);
    vertex(-(width/2 + padding), height/2, 0);
    vertex(-(width/2 + padding), -height/2, 0);
    vertex(-(width+(width/2) + padding), -height/2, 0);
    endShape();

    // Segundo color a mezclar
    blendShader.setUniform('uMaterial1', identity);
    blendShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
    blendShader.setUniform('brightness', 1.0);

    // Tercer color a mezclar
    blendShader.setUniform('uMaterial1', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
    blendShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
    blendShader.setUniform('brightness', brightness.value());

    beginShape();
    vertex(width/2 + padding, height/2, 0);
    vertex(width/2 + padding + width, height/2, 0);
    vertex(width/2 + padding + width, -height/2, 0);
    vertex(width/2 + padding, -height/2, 0);
    endShape();
    
    blendShader.setUniform('uMaterial1', identity);
    blendShader.setUniform('uMaterial2', [red(color2Color), green(color2Color), blue(color2Color), 1.0]);
    blendShader.setUniform('brightness', 1.0);

    beginShape();
    vertex( -(width/2), height/2, 0 );
    vertex( width/2, height/2, 0 );
    vertex( width/2, -height/2, 0 );
    vertex( -(width/2), -height/2, 0 );
    endShape();
}
```
{{< /details >}}

<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="color-blending">
    {{< p5-iframe sketch="/showcase/sketches/finded_color_blending.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="520" height="530">}}
</div>

## Color Blending (por software) y aplicación futura 🧠
Una de las aplicaciones realizadas de Color Blending involucraba la mezcla de colores en sus canales RGB a través de una interfaz interactiva, en la cual se creaba un canva para ser coloreado por los colores seleccionados por el usuario para dotar de dinamismo al ejercicio. Como grupo, invitamos a que esta aplicación sea trasladada al uso de *shaders*.

{{< details title="Código fuente" open=false >}}
```js
function draw() {
  if (!isSliderClicked && !isColorPickerClicked) {
    currentColor = getActualColor();
    drawActualColor(currentColor);
    let newColor = colorPicker.color();
    selectedColors.push(newColor);
    if (mouseIsPressed == true) {
      fill(
        newColor.levels[0] + random(-25, 25), 
        newColor.levels[1] + random(-25, 25), 
        newColor.levels[2] + random(-25, 25), 
        10);

        for (i=0;i<3;i++){
          push();
          translate(mouseX,mouseY);
          rotate(random(PI*2));
          beginShape();
          for (m = 0; m < PI * 2; m += 1) {
            r = r_slider.value();
            let x = cos(m) * r;
            let y = sin(m) * r;
            vertex(x, y);
          }
          endShape(CLOSE);
          pop();
        }
    }
  }
}

function drawActualColor(color) {
  push();
  fill(color);
  stroke(0);
  strokeWeight(2);
  rect(10, 10, 50, 50);
  pop();
}

function getActualColor() {
  let redTotal = 0;
  let greenTotal = 0;
  let blueTotal = 0;
  canvasColors = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let color = get(x, y);
      canvasColors.push(color);
    }
  }

  for (let i = 0; i < canvasColors.length; i++) {
    redTotal += red(canvasColors[i]);
    greenTotal += green(canvasColors[i]);
    blueTotal += blue(canvasColors[i]);
  }

  let redAvg = redTotal / canvasColors.length;
  let greenAvg = greenTotal / canvasColors.length;
  let blueAvg = blueTotal / canvasColors.length;

  // Color nuevo: promedio de todos los canales (R, G, B)
  let mixedColor = color(redAvg, greenAvg, blueAvg);

  canvasColors = [];
  console.log(mixedColor.toString("#rrggbb"))
  return mixedColor;
}
```
{{< /details >}}

<div style="display:flex; flex-direction: column; align-items: center; justify-content: center;" id="color-blending-software">
    {{< p5-iframe sketch="/showcase/sketches/software_color_blend.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js" width="230" height="250">}}
</div>

## **Conclusiones 🤓**

* Podemos visualizar que, el uso de fragments shaders permite realizar de manera mucho más sencilla y rápida la mezcla de los colores, en comparación a la aplicación realizada por software. Por lo tanto, los recursos computacionales a usar son menores.

* El color blending nos permite conocer los efectos especiales que pueden ser aplicados en diferentes ámbitos de la computación y el diseño gráfico. Es así como funcionan ciertas aplicaciones de edición de imágenes y vídeos, diseño, entre otras, ya que, a través del ajuste dado a cada píxel, se obtienen resultados realistas dotados de transparencia, opacidad, iluminación, etc. Es a partir de aquí que comienza el *Color o texture tinting*.

## **Referencias 📚**

{{< hint danger >}}

* Visual Computing. (2022, 9 noviembre). Coloring. Visual Computing. Recuperado de https://visualcomputing.github.io/docs/shaders/coloring/
* Wikipedia contributors. (2022, 9 noviembre). Color Mixing. Wikipedia. Recuperado de https://en.wikipedia.org/wiki/Color_mixing

{{< /hint >}}

