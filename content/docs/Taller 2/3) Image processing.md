
# Image processing

## Procesamiento de imágenes
El procesamiento de imágenes es una disciplina que se enfoca en la manipulación y análisis de imágenes digitales con el objetivo de mejorar su calidad, extraer información útil o realizar transformaciones específicas.

El procesamiento de imágenes se basa en la utilización de algoritmos y técnicas específicas para realizar operaciones sobre los píxeles que conforman una imagen. Los píxeles representan los elementos fundamentales de una imagen digital y contienen información sobre su color y posición en el espacio. Al aplicar diferentes operaciones sobre estos píxeles, es posible modificar su apariencia, extraer características o realizar análisis cuantitativos.

## Convolución
La convolución es una operación fundamental en el procesamiento de imágenes que permite combinar una imagen con un filtro o máscara para resaltar características específicas. Consiste en deslizar el filtro sobre la imagen y realizar multiplicaciones y sumas en cada posición para generar una nueva imagen resultante. La convolución es ampliamente utilizada en el procesamiento de imágenes para aplicar efectos como la detección de bordes, el desenfoque o el realce de detalles.

{{< hint danger>}}
**Consigna**
<br>
implementar una aplicación de procesamiento de imagen/video compatible con diferentes máscaras, incluidos otros tamaños de kernel diferentes a 3x3, y:
- Una herramienta base de región de interés para aplicar selectivamente una máscara determinada.
- Una herramienta de lupa.
- Integre luma y otras herramientas de brillo de color.
{{< /hint>}}

## Descripción general
Para esta aplicación se desarrollaron dos programas, el primero está enfocado en una herramienta de lupa, y el segundo, en una aplicación que realiza efectos de detección de bordes y detección de brillo en una imagen. Los programas utilizan shaders para procesar los píxeles de la imagen y lograr los efectos deseados. El shader *vertex* se encarga de procesar la geometría de la imagen, mientras que el shader *fragment* se encarga de calcular el color final de cada píxel en función de los efectos seleccionados.

## Vertex shader
Las dos apliaciones utilizan el mismo vertex shader. Su funcionamiento se describe a continuación.

- Invierte verticalmente las coordenadas de textura para que sean compatibles con el sistema gráfico.
{{<hint info>}}
**vTexCoord = vec2(aTexCoord.x, 1.0 - aTexCoord.y)**: En esta línea, se asignan las coordenadas de textura al varying vTexCoord. Antes de asignarlas, se realiza una transformación para invertir verticalmente las coordenadas de textura, ya que en algunos sistemas gráficos el origen de las coordenadas de textura se encuentra en la esquina superior izquierda.
{{</hint>}}

- Transforma las coordenadas de posición del vértice al rango [-1, 1] en el espacio de recorte.
{{<hint info>}}
**positionVec4.xy = positionVec4.xy * 2.0 - 1.0**: En esta línea, se realiza una transformación lineal para mapear las coordenadas de posición del vértice al rango [-1, 1]. Esto se logra multiplicando las coordenadas por 2.0 y restando 1.0.
{{</hint>}}

{{<details title="Vertex shader" open=false >}}
```c++
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  vTexCoord = vec2(aTexCoord.x, 1.0 - aTexCoord.y); // Flip the texture coordinates vertically
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}

```
{{</details>}}
# Aplicación 1: Lupa

## Procesamiento de la imagen
Dentro del shader, se realiza un bucle para iterar sobre cada píxel de la imagen y aplicar el kernel para obtener la suma de colores resultante . El kernel es una matriz que define cómo se combina cada píxel con sus vecinos adyacentes. En este ejemplo, se utiliza un kernel de identidad que no modifica la imagen original.
A continuación, se verifica si el píxel actual está dentro del radio de la lógica de magnificación. Si es así, se calcula la posición del píxel magnificado utilizando la posición relativa al centro del píxel de magnificación y se obtiene el color correspondiente de la textura de muestra. Si el píxel está fuera del radio de magnificación, se utiliza el color resultante del kernel.

## Fragment shader
Para conseguir el efecto de aumento o lupa, el fragment shader trabaja de la siguiente manera:
- Se calcula el tamaño de un píxel en las coordenadas de textura (***onePixel***) dividiendo el vector ***(1.0, 1.0)*** por la resolución de la pantalla (***uResolution***).
- Se inicializa ***colorSum*** como un vector ***vec4*** que almacenará la suma acumulada de los colores resultantes al aplicar el kernel.
- Se utiliza un bucle anidado for para recorrer los valores correspondientes a las filas y columnas del kernel.
- Se calcula el desplazamiento (***offset***) del píxel actual en función de su posición relativa al centro del kernel.
- Se obtiene el color del píxel vecino correspondiente a la posición desplazada y se multiplica por el valor del kernel correspondiente. El resultado se suma a ***colorSum*** para acumular los colores procesados.
- Luego se aplica la lógica de magnificación. Se calcula la distancia desde el píxel actual hasta el centro del área de magnificación utilizando las coordenadas de textura (***dx*** y ***dy***). Si la distancia es menor que el radio del área de magnificación dividido por la resolución horizontal (***uMagnifierRadius / uResolution.x***), se realiza la magnificación.
- Se calculan las coordenadas de textura magnificadas y se obtiene el color de la textura de muestra (***uSampler***) en esas coordenadas.
- Si el píxel no está dentro del área de magnificación, se asigna a ***gl_FragColor*** el valor acumulado (***colorSum***).

{{<details title="Fragment shader lupa" open=false >}}
```c++
precision mediump float;

uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform float uKernelSize;
uniform float uKernel[25];
uniform float uMagnifier;
uniform vec2 uMagnifierCenter;
uniform float uMagnifierRadius;

varying vec2 vTexCoord;

void main() {
  vec2 onePixel = vec2(1.0, 1.0) / uResolution;
  vec4 colorSum = vec4(0.0);

  for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
      if (i < int(uKernelSize) && j < int(uKernelSize)) {
        vec2 offset = vec2(float(i) - (uKernelSize - 1.0) / 2.0, float(j) - (uKernelSize - 1.0) / 2.0) * onePixel;
        colorSum += texture2D(uSampler, vec2(vTexCoord.x + offset.x, vTexCoord.y + offset.y)) * uKernel[j * 5 + i];
      }
    }
  }

  // Magnifier logic
  float dx = vTexCoord.x - uMagnifierCenter.x;
  float dy = vTexCoord.y - uMagnifierCenter.y;
  float distance = sqrt(dx * dx + dy * dy);

  if (distance < uMagnifierRadius / uResolution.x) {
    vec2 direction = vec2(dx, dy);
    vec2 magnifiedTexCoord = uMagnifierCenter + direction * uMagnifier;
    gl_FragColor = texture2D(uSampler, magnifiedTexCoord);
  } else {
    gl_FragColor = colorSum;
  }
}

```
{{</details>}}

### Sketch
{{<details title="Sketch lupa" open=false >}}
```js
function draw() {
// Update magnifier center and radius based on mouse input
  let magnifierCenter = [mouseX / width, mouseY / height];
  let magnifierRadius = circleSizeSlider.value();

  shaderProgram.setUniform('uMagnifierCenter', magnifierCenter);
  shaderProgram.setUniform('uMagnifierRadius', magnifierRadius);

  // Set the kernel and magnifier values
  let kernel = [ // Example: Identity kernel
    0, 0, 0,
    0, 1, 0,
    0, 0, 0
  ];
  let kernelSize = 9;
  let magnifier = 2 - magnificationFactorSlider.value();

  shaderProgram.setUniform('uKernelSize', kernelSize);
  shaderProgram.setUniform('uKernel', kernel);
  shaderProgram.setUniform('uMagnifier', magnifier);

  rect(0, 0, img.width, img.height);
}
```
{{</details>}}

## Funcionalidad 

El programa carga una imagen y la presenta en el canva. El usuario puede interactuar pasando el cursor sobre la imagen para visualizar el efecto de lupa. Así mismo puede modificar el tamaño del círculo de aplicación y la intensidad del efecto haciendo uso de los sliders.

{{<hint warning>}}
- Se pueden utilizar las teclas + y - para aumentar o reducir la intensidad del efecto.
- Para modificar el tamaño del círculo es posible hacerlo con las teclas de izquierda (←) y derecha (→)
{{</hint>}}
{{< p5-iframe sketch="/showcase/sketches/magnifier.js?version=4" width="620" height="630" >}}
# Aplicación 2: Detección de bordes y ajuste de brillo


## Procesamiento de la imagen
El shader procesa la imagen píxel por píxel, aplicando la máscara seleccionada y calculando el valor final del píxel en función de los efectos y parámetros configurados. Se utilizan técnicas de convolución y operaciones matemáticas para obtener los resultados deseados.

### Fragment shader

#### Detección de bordes con kernel de máscara de convolución
Para determinar el valor de un pixel luego de aplicarle una máscara de convolución con un kernel determinado se usa la función auxiliar ***getKernelValue***:

Esta función toma como argumentos row y col (fila y columna) para obtener el valor del kernel de detección de bordes correspondiente a esa posición. El valor se determina según los tipos de máscara y tamaño del kernel especificados en las variables uniformes. Dependiendo de los valores de effectType y maskType, se establecen diferentes valores para cada posición del kernel. A continuación se detallan los tipos de máscaras utilizadas:

{{<tabs "edge-detector">}}
{{<tab "Laplacian of Gaussian">}}
<img src = "/showcase/sketches/log.png">
{{</tab>}}
{{<tab "Laplacian">}}
<img src = "/showcase/sketches/laplacian.png">
{{</tab>}}
{{<tab "Sobel">}}
<img src = "/showcase/sketches/sobel.png">
{{</tab>}}
{{<tab "Kirsch">}}
<img src = "/showcase/sketches/kirsch.png">
{{</tab>}}
{{<tab "Robinson">}}
<img src = "/showcase/sketches/robinson.png">
{{</tab>}}
{{<tab "Roberts">}}
<img src = "/showcase/sketches/roberts.png">
{{</tab>}}
{{</tabs>}}

Para el caso de la detección de brillo se hizo uso de las siguientes máscaras de convolución

{{<tabs "brightness">}}
{{<tab "HSV">}}
<img src = "/showcase/sketches/br_hsv.png">
{{</tab>}}
{{<tab "RGB">}}
<img src = "/showcase/sketches/br_rgb.png">
{{</tab>}}
{{<tab "LUMA">}}
<img src = "/showcase/sketches/br_luma.png">
{{</tab>}}
{{</tabs>}}

{{<hint info>}}
Dado que al trabajar con diferentes tamaños de kernel, las matrices de convolución se complejizan a medida que se incrementa el tamaño, solo se trabajó con diferentes tamaños de kernel usando la matriz de convolución **Laplacian of Gaussian**
{{</hint>}}

#### Efecto de detección de bordes o filtrado:

- **vec2 onePixel = vec2(1.0, 1.0) / uResolution**: Se calcula el tamaño de un píxel en relación a la resolución de la pantalla.

- **vec4 colorSum = vec4(0.0)**: Se inicializa una variable para almacenar la suma acumulada de colores.

- El bucle for anidado se utiliza para iterar a través de cada posición del kernel y calcular la suma ponderada de los colores de la textura de entrada. La suma se realiza multiplicando el color de la textura en cada posición del kernel con el valor correspondiente obtenido de getKernelValue, y luego se acumula en colorSum.

 - **float edge = length(colorSum)**: Se calcula la magnitud del vector colorSum para obtener el valor del borde.

- Se calcula la posición del píxel actual en relación a la posición del círculo y se calcula la distancia entre ellos. Si la distancia entre el píxel y el centro del círculo es menor que el radio del círculo, se asigna un nuevo color al fragmento utilizando ***gl_FragColor***. El color se basa en la intensidad del efecto multiplicada por el valor del borde calculado anteriormente. Esto genera un efecto visual dentro del círculo.
En caso contrario, se asigna el color original de la textura al fragmento utilizando ***gl_FragColor***.

{{<details title="Fragment shader" open=false >}}
```c++
precision mediump float;

uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform int uApplyEffect;
uniform vec2 uCirclePosition;
uniform float uCircleRadius;
uniform float uEffectIntensity;
uniform float edgeDetectionKernel[25];
uniform int maskType;
uniform int kernelSize;
uniform int effectType;
varying vec2 vTexCoord;

float getKernelValue(int row, int col) {
  if(effectType == 1){
    int middle = kernelSize / 2;
    float center_value;
    float default_value;

    if(maskType == 0 || kernelSize > 3){ //LAPLACIAN OF GAUSSIAN
      default_value = -1.0;
      if(kernelSize == 3) center_value = 8.0;
      if(kernelSize == 5) center_value = 24.0;
      if(kernelSize == 7) center_value = 48.0;
      if(kernelSize == 9) center_value = 72.0;

    }else if(maskType == 1){//LAPLACIAN
      default_value = 0.0;
      center_value = 4.0;
    .
    .
    .
  }
  if(row == middle && col == middle) return center_value;
  return default_value;
}

void main() { 
  if(maskType <= 5){

      vec2 onePixel = vec2(1.0, 1.0) / uResolution;

      vec4 colorSum = vec4(0.0);

      if(kernelSize == 3){
        for (int i = 0; i < 3; i++) {
          for (int j = 0; j < 3; j++) {
            vec2 offset = vec2(float(i) - 2.0, float(j) - 2.0) * onePixel;

            vec4 kernel = vec4(getKernelValue(i, j));
            colorSum += texture2D(uSampler, vTexCoord + offset) * kernel;
          }
        }
      }
      .
      .
      .
      float edge = length(colorSum);

      vec2 pixelPosition = vTexCoord * uResolution;
      float distance = length(pixelPosition - uCirclePosition);

      if (uApplyEffect == 1 && distance < uCircleRadius) {
        gl_FragColor = vec4(vec3(edge * uEffectIntensity), 1.0);
      } else {
        gl_FragColor = texture2D(uSampler, vTexCoord);
      }
  }
}

```
{{</details>}}

Se hizo una última implementación para la detección de bordes sin usar máscara de convolución:
- Se realiza un cálculo similar al anterior para obtener los valores de borde en las direcciones horizontal (colorX) y vertical (colorY).
- Se selecciona el mayor valor entre edgeX y edgeY como el valor de borde final (edge).
- Se realiza el cálculo de la distancia y la comprobación de uApplyEffect igual a 1, similar al caso anterior, para aplicar el efecto en el fragmento dentro del círculo.

{{<details title="Detección de bordes sin máscara de convolución" open=false >}}
```c++
vec2 onePixel = vec2(1.0, 1.0) / uResolution;
vec4 color = texture2D(uSampler, vTexCoord);
vec4 colorX = texture2D(uSampler, vTexCoord + vec2(onePixel.x, 0.0));
vec4 colorY = texture2D(uSampler, vTexCoord + vec2(0.0, onePixel.y));
float edgeX = length(color - colorX);
float edgeY = length(color - colorY);
float edge = max(edgeX, edgeY);

// Calculate the distance from the current pixel to the circle center
vec2 pixelPosition = vTexCoord * uResolution;
float distance = length(pixelPosition - uCirclePosition);

if (uApplyEffect == 1 && distance < uCircleRadius) {
  // Apply the effect with the specified intensity
  gl_FragColor = vec4(vec3(edge * uEffectIntensity), 1.0);
} else {
  gl_FragColor = color; // Display the original image for pixels outside the circle
}
```
{{</details>}}

### Sketch 
{{<details title="Sketch edge-detector" open=false >}}
```js
function draw() {
  // Update the circle position based on mouse input
  let circleCenter = [mouseX * pixelDensity(), mouseY * pixelDensity()];

  shaderProgram.setUniform('effectType', radio.value());
  shaderProgram.setUniform('maskType', maskType);



  // Pass circle position, radius, and effect intensity to the shader
  shaderProgram.setUniform('uCirclePosition', circleCenter);
  shaderProgram.setUniform('uCircleRadius',circleSizeSlider.value());
  shaderProgram.setUniform('uEffectIntensity', effectSlider.value());
  shaderProgram.setUniform('uApplyEffect', 1);
  shaderProgram.setUniform('kernelSize', kernelSize);
  rect(0, 0, width, height);

  if (keyIsPressed) {
    if (keyCode === LEFT_ARROW) {
      circleSizeSlider.value(circleSizeSlider.value() - 1);
    }
    if (keyCode === RIGHT_ARROW) {
      circleSizeSlider.value(circleSizeSlider.value() + 1);
    }
    if (key === '+') {
      effectSlider.value(effectSlider.value() + 0.005);
    }
    if (key === '-') {
      effectSlider.value(effectSlider.value() - 0.005);
    }

    effectIntensity = constrain(effectIntensity, 0, 1);
  }
}
```
{{</details>}}
## Funcionalidad
El programa carga una imagen y la muestra en un canva. Utiliza un shader para aplicar un efecto de detección de bordes o ajuste de brillo, según la selección del usuario. El usuario puede ajustar el tamaño de un círculo y la intensidad del efecto mediante controles deslizantes. El programa también permite cambiar entre diferentes tipos de máscaras de detección de bordes y ajuste de brillo seleccionando opciones en un menú desplegable.

{{<hint warning>}}
### Modo de uso
- Al inicio se debe seleccionar alguno de los dos efectos disponibles: Edge-detector o Brightness. De lo contrario solo verá un circulo negro. Luego de seleccionar se mostrará una lista desplegable para seleccionar el tipo de máscara de convolución que se desea usar. 

- Para cambiar el tamaño del kernel usando los botones 3, 5, 7 y 9 para alternar entre kernel de tamaño 3x3, 5x5, 7x7 y 9x9 respectivamente.
<br><br>
- Se pueden utilizar las teclas + y - para aumentar o reducir la intensidad del efecto.
- Para modificar el tamaño del círculo es posible hacerlo con las teclas de izquierda (←) y derecha (→)
<br><br>
- Si algún efecto no se visualiza correctamente (se ve el círculo totalmente negro o totalmente blanco) considere reducir o aumentar la intensidad del efecto utilizando el segundo slider.
{{</hint>}}
{{< p5-iframe sketch="/showcase/sketches/edgeDetector.js?version=4" width="750" height="600" >}}


## Conclusiones
{{< hint info >}}
- El uso de shaders en la aplicación permite procesar la imagen en tiempo real, lo que significa que los usuarios pueden ajustar los parámetros del filtro y del efecto en cuestión y estos cambios realizados se reflejan instantáneamente en la pantalla. Esto proporciona una retroalimentación inmediata y permite explorar diferentes configuraciones y efectos visuales. Al mismo tiempo permite crear una aplicación interactiva, brindando una experiencia dinámica y personalizada.

- El proyecto define varios tipos de máscaras, como el Laplaciano de Gaussiana, Laplaciano, Sobel, Kirsch, Robinson y Roberts. Cada tipo de máscara tiene una estructura y configuración específica.

- Las máscaras tienen diferentes tamaños, como 3x3, 5x5, 7x7 y 9x9. El tamaño de la máscara afecta la cantidad de píxeles vecinos considerados en la operación de convolución y, por lo tanto, puede tener un impacto en el resultado final.

- Cada máscara tiene una matriz de convolución con elementos que determinan el peso o la contribución de los píxeles vecinos en la operación de convolución. Estos valores pueden afectar la detección de características o el realce de ciertos elementos en la imagen.
{{< /hint >}}



## Referencias
{{< hint danger >}}
  El código antes presentado fue realizado en colaboración con la herramienta de procesado de lenguaje Chat GPT y recursos disponibles en la web
  - [Edge Detection Methods Comparison](https://anirban-karchaudhuri.medium.com/edge-detection-methods-comparison-9e4b75a9bf87)

{{< /hint >}}



