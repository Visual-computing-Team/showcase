
# Visual posteffects

{{< hint danger >}}
<b> Consigna </b>
Implemente algunos post efectos que encuentre interesantes
{{< /hint >}}

## Qué es un post efecto? 📕

Un post efecto es, precisamente, un efecto que se aplica a la imagen final, una vez que se han renderizado todos los objetos de la escena. Estos efectos se usan para varios fines, sin embargo el que más sobresale es el de resaltar ciertos aspectos de la escena, como por ejemplo, el resaltar los bordes de los objetos o el resaltar ciertos colores del renderizado final.

Algunos de los post efectos más comunes son:

{{< hint info >}}
1. **Vignette**: Este efecto se usa para oscurecer los bordes de la imagen, para darle un efecto de viñeta. Este efecto se usa mucho en juegos de terror, para darle un efecto de misterio a la escena.

2. **Zoom** : Este efecto se usa para acercar la imagen a cierta parte en específico o para hacerla ver más grande en cierta zona como tal. Este efecto tiene varios usos, uno de los más comunes es cuando se quiere implementar el efecto de lupa, usado tanto en juegos como en aplicaciones.

3. **Blur**: Este efecto da desenfoque a la imagen, distorsionando la imagen original y haciendola menos visible y más borrosa. Este efecto se asemeja al desenfoque se genera cuando se toma una foto con una cámara, y se usa para darle un efecto de movimiento a la imagen.

4. **Filtros de color**: Este efecto se usa para cambiar el color de la imagen, añadiendo o restando nitidiez, o incluso poniendo la imagen con cierta paleta de colores.

5. **Ajuste de perspectiva**: Este efecto se usa para cambiar la perspectiva de la imagen, haciendo que se vea desde un punto de vista diferente, o incluso desde un punto de vista más alto o más bajo.
 {{< /hint >}}

## Aplicación de post efectos 🎨
Para poder ver la diferencia entre un post efecto realizado con software y uno con shaders, se implementaron dos proyectos. Cada uno con su respectivo procesamiento.

### Post efectos con software 🖥️
En el ejemplo que se ve a continuación se ven tres post efectos realizados. Principalmente son post efectos personalizados por lo cual no tienen un nombre en específico. Estos son:

{{< tabs "Efectos con software" >}}
{{< tab "Partición de la imagen" >}} 
    En este post efecto se divide la imagen en forma de tiras y se 
    redistribuye de forma vertical de tal forma que 
    la imagen se vea partida.
{{< /tab >}}
{{< tab "Partículas" >}} 
    En este efecto, parte de la imagen se muestra en forma de partículas 
    lo cual distorsiona la imagen original.
{{< /tab >}}
{{< tab "curvas" >}} 
    En este efecto se puede apreciar como la imagen se rehace en forma de 
    curvas, es decir, se crean pequeñas curvilíneas que forman la imagen 
    original.
{{< /tab >}}
{{< /tabs >}}

Cabe mencionar que estos efectos, al estar hechos con software, toman mucho tiempo en renderizar ya que en todos
se debe recorrer la imagen píxel por píxel para aplicar la transforamción correspondiente.

{{< hint warning >}}
    Para poder ver los efectos, debe oprimir las siguientes teclas:
        💠 1: Partición de la imagen
        💠 2: Partículas
        💠 3: Curvas
{{< /hint >}}

{{< p5-div sketch="/showcase/sketches/software_posteffects.js">}}
{{< details title="Post efectos con software" open=false >}}
```js
new p5((p) => {
  let img;
  let canvas;

  let effectIndex = 0; // Variable para controlar el efecto activo

  function preload() {
    img = p.loadImage('/showcase/sketches/img_soft/shitzu_lindo.jpg');
  }

  function setup() {
    p.createCanvas(400, 400);
    img.resize(400, 400);
    p.noLoop();
  }

  function draw() {
    p.background(220);
    p.image(img, 0, 0);

    switch (effectIndex) {
      case 0:
        applyEffect1();
        break;
      case 1:
        applyEffect2();
        break;
      case 2:
        applyEffect3();
        break;
      default:
        break;
    }
  }

  //Efecto de partición de imagen
  function applyEffect1() {
    img.resize(400, 400);
    p.image(img, 0, 0);

    for (let i = 0; i < p.width; i += 10) {
      let stripeXPosition = p.int(p.random(0, img.width - 10));
      let stripeX = img.get(stripeXPosition, 0, 10, img.height);
      p.image(stripeX, i, 0);
    }
  }

  //Efecto de partículas de la imagen
  function applyEffect2() {
    img.resize(p.width, p.height);
    p.image(img, 0, 0);

    const range = 250;
    for (let i = 0; i < p.height; i++) {
      for (let j = 0; j < p.width; j++) {
        const pixelColor = img.get(i + p.random(range), j + p.random(range));
        p.stroke(pixelColor);
        p.point(i, j);
      }
    }
  }

  //Efecto de curvas y reconstrucción de la imagen
  function applyEffect3() {
    let resultImg = p.createGraphics(img.width, img.height);

    for (let col = 0; col < img.width; col++) {
      for (let row = 0; row < img.height; row++) {
        let xPos = p.random(col);
        let yPos = p.random(row);

        let c = img.get(xPos, yPos);
        resultImg.noFill();
        resultImg.strokeWeight(p.random(5));
        resultImg.stroke(p.color(c));
        resultImg.curve(
          xPos + p.random(160),
          yPos + p.random(90),
          xPos - p.random(90),
          yPos - p.random(160),
          xPos + p.random(160),
          yPos + p.random(90),
          xPos - p.random(90),
          yPos - p.random(160)
        );
      }
    }

    p.image(resultImg, 0, 0);
  }

  //Interactividad con el canvas
  function keyPressed(event) {
    if (event.keyCode === 49) { // Tecla "1"
      effectIndex = 0;
      p.redraw();
    } else if (event.keyCode === 50) { // Tecla "2"
      effectIndex = 1;
      p.redraw();
    } else if (event.keyCode === 51) { // Tecla "3"
      effectIndex = 2;
      p.redraw();
    }
  }

  p.preload = preload;
  p.setup = setup;
  p.draw = draw;
  p.keyPressed = keyPressed;
}, "software_posteffects");

```
{{< /details >}}

### Post efectos con shaders 🎨

Ahora veremos la gran diferencia que tienen los post efectos a la hora de aplicarlos con shaders. En este caso, se implementaron tres post efectos, los cuales son:

{{< tabs "Efectos con shaders" >}}
{{< tab "Blur" >}} 
    En este post efecto se aplica un blur a la imagen
    ,es decir, se distorsiona la imagen original y se 
    le da un efecto de desenfoque.
{{< /tab >}}
{{< tab "Vignette" >}} 
    En este post efecto se aplica un vignette a la 
    imagen, es decir, se oscurecen los bordes de 
    la imagen y se le da un efecto de viñeta.
{{< /tab >}}
{{< tab "Zoom" >}} 
    En este post efecto se aplica un efecto de zoom a la imagen
    , es decir, se acerca la imagen a cierta parte de la misma.
{{< /tab >}}
{{< /tabs >}}

Como se sabe los shader.frag se ejecutan por cada pixel de la imagen, por lo cual, el tiempo de renderizado es mucho menor que el de los post efectos con software.

{{< hint warning >}}
    Para poder ver los efectos, debe oprimir el 
    botón "Cambiar efecto."
{{< /hint >}}

<div style="display: flex; flex-direction: column;width: 400px; margin-bottom: 20px;">
    {{< p5-div sketch="/showcase/sketches/shaders_post.js" >}}
</div>

{{< details title="Post efectos con shaders" open=false >}}
```js
new p5((p) => {
  let img;
  let shaderProgram;
  let currentEffect = 'vignette';
  let toggleButton;
  let canvas;

  //Carga los shaders
  function preload() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader.vert', '/showcase/sketches/post_shaders/unfocus.frag');
  }

  //Creación del canvas y del botón
  function setup() {
    canvas = p.createCanvas(400, 400, p.WEBGL);
    toggleButton = p.createButton('Cambiar efecto');
    toggleButton.mousePressed(toggleEffect);
    p.noLoop();
  }

  //Carga la imagen y redibuja la imagen con el nuevo efecto 
  function loadImageAndApplyEffect() {
    p.loadImage('https://upload.wikimedia.org/wikipedia/commons/3/30/Shih-Tzu.JPG', function (loadedImg) {
      img = loadedImg;
      p.redraw();
    });
  }

  // Aplica el efecto de viñeta
  function applyVignetteEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader.vert', '/showcase/sketches/post_shaders/vignette.frag');
    currentEffect = 'vignette';
    loadImageAndApplyEffect();
  }

  // Aplica el efecto de desenfoque
  function applyUnfocusEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader.vert', '/showcase/sketches/post_shaders/unfocus.frag');
    currentEffect = 'unfocus';
    loadImageAndApplyEffect();
  }

  // Aplica el efecto de zoom
  function applyZoomEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader.vert', '/showcase/sketches/post_shaders/zoom.frag');
    currentEffect = 'zoom';
    loadImageAndApplyEffect();
  }

  // Dibuja la imagen con el efecto seleccionado
  function draw() {
    if (!img) return;

    p.shader(shaderProgram);
    // Envía la imagen al shader
    shaderProgram.setUniform('u_texture', img);

    // Ajusta los valores de los uniformes según el efecto
    if (currentEffect === 'vignette') {
      p.background(255);
      shaderProgram.setUniform('u_radius', 0.5);
      shaderProgram.setUniform('u_softness', 0.2);
    } else if (currentEffect === 'unfocus') {
      shaderProgram.setUniform('u_blurAmount', 0.02);
    } else if (currentEffect === 'zoom') {
      shaderProgram.setUniform('u_zoomAmount', 1.5); // Ajusta el valor de zoom aquí
    }

    // Dibuja un rectángulo que ocupa toda la pantalla
    p.beginShape();
    p.vertex(-1, -1, 0, 0);
    p.vertex(1, -1, 1, 0);
    p.vertex(1, 1, 1, 1);
    p.vertex(-1, 1, 0, 1);
    p.endShape(p.CLOSE);
  }

  // Cambia el efecto activo
  function toggleEffect() {
    if (currentEffect === 'vignette') {
      applyUnfocusEffect();
    } else if (currentEffect === 'unfocus') {
      applyZoomEffect();
    } else {
      applyVignetteEffect();
    }
  }

  p.preload = preload;
  p.setup = setup;
  p.draw = draw;
  p.loadImageAndApplyEffect = loadImageAndApplyEffect;

  loadImageAndApplyEffect();
}, "shaders_post" );
```
{{< /details >}}

{{< details title="Unfocus shader" open=false >}}

```glsl 
precision mediump float;

uniform sampler2D u_texture;
varying vec2 vTexCoord;

const float blurAmount = 0.02; // Ajusta el valor para controlar la intensidad del desenfoque

void main() {
  vec4 color = vec4(0.0);
  
  // Aplica el desenfoque mediante el muestreo de múltiples píxeles vecinos
  for (float i = -4.0; i <= 4.0; i += 1.0) {
    for (float j = -4.0; j <= 4.0; j += 1.0) {
      vec2 offset = vec2(i, j) * blurAmount;
      color += texture2D(u_texture, vTexCoord + offset);
    }
  }
  
  // Calcula el color promedio y asigna el resultado final
  color /= 81.0; // Dividir por la cantidad de píxeles muestreados
  gl_FragColor = color;
}
```
{{< /details >}}


{{< details title="Vignette shader" open=false >}}

```glsl

// Fragment shader para el efecto de viñeta
precision mediump float;

uniform sampler2D u_texture;
varying vec2 vTexCoord;

const vec2 center = vec2(0.5, 0.5); // Coordenadas del centro de la imagen
const float radius = 0.5; // Radio de la viñeta
const float softness = 0.2; // Suavidad del borde de la viñeta

void main() {
  vec2 distance = vTexCoord - center;
  float vignette = smoothstep(radius, radius - softness, length(distance));
  
  vec4 color = texture2D(u_texture, vTexCoord);
  
  // Aplica el efecto de viñeta multiplicando el color por el factor de viñeta
  gl_FragColor = color * vec4(vignette);
}

```
{{< /details >}}

{{< details title="Zoom shader" open=false >}}

```glsl

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform float u_blurAmount;
uniform float u_zoomAmount;

varying vec2 vTexCoord;

void main() {
  vec2 blurredTexCoord = vTexCoord + u_blurAmount;
  
  // Aplica el efecto de zoom
  vec2 zoomedTexCoord = (blurredTexCoord - 0.5) / u_zoomAmount + 0.5;
  
  vec4 color = vec4(0.0);
  float totalWeight = 0.0;

  for (float dx = -2.0; dx <= 2.0; dx += 1.0) {
    for (float dy = -2.0; dy <= 2.0; dy += 1.0) {
      vec2 offset = vec2(dx, dy) * u_blurAmount;
      vec4 sampleColor = texture2D(u_texture, zoomedTexCoord + offset);
      float weight = 1.0 - length(offset) / 2.8284; // Gaussian-like weight
      color += sampleColor * weight;
      totalWeight += weight;
    }
  }

  gl_FragColor = color / totalWeight;
}

```
{{< /details >}}


### Post efecto con software y shaders

Sin embargo, a pesar de las diferencias entre los dos tipos de implementación de un post efecto, estos pueden relacionarse armoniosamente en varios aplicaciones. 

Para este post efecto se implementa los mismos post efectos con shaders, no obstante, por el lado del software se implementa un efecto en donde se juega con los vertices de la imagen, permitiendo de esta manera su reconstrucción. Cómo se puede ver más adelante:

{{< hint warning >}}
    Para poder ver los efectos, debe oprimir el 
    botón "Cambiar imagen y efecto. Puede jugar con el 
    slider para acelarar o desacelerar la construcción
    de la imagen"
{{< /hint >}}


<div style="display: flex; flex-direction: column ;width: 400px; position: relative; margin-bottom: 20px;">
    {{< p5-div sketch="/showcase/sketches/shader_soft.js" >}}
</div>


{{< details title="Shader and software code" open=false >}}

```js

new p5((p) => {
  let img;
  let originalImg;
  let shaderProgram;
  let currentEffect = 'vignette';
  let toggleButton;
  let intervalSlider;
  let intervalId; // Variable para almacenar el ID del intervalo

  let vertices = [];
  let interval = 1000;

  function preload() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader_v_p.vert', '/showcase/sketches/post_shaders/vignette.frag');
  };

  function setup() {
    p.createCanvas(400, 400, p.WEBGL);
    p.noLoop();

    // Crea un botón para cambiar la imagen y el efecto
    toggleButton = p.createButton('Cambiar imagen y efecto');
    toggleButton.mousePressed(changeImageAndEffect);

    // Crea un slider para cambiar el intervalo del setInterval
    intervalSlider = p.createSlider(1, 1000, interval, 10);
    intervalSlider.input(changeInterval);

    intervalId = setInterval(changeVertexValues, interval);

    // Inicializa los vértices del dibujo con valores aleatorios
    for (let i = 0; i < 4; i++) {
      vertices.push([p.random(-1, 1), p.random(-1, 1)]);
    }
    
    originalImg = p.createImg('');


  };

  // Carga una imagen aleatoria y aplica el efecto actual
  function loadImageAndApplyEffect() {
    let randomNum = Math.floor(p.random(0, 40));
    let imagePath = '/showcase/sketches/historical_img/' + String(randomNum) + '.jpg';

    p.loadImage(imagePath, function(loadedImg) {
      img = loadedImg;
      originalImg.elt.src = imagePath; // Establece la ruta de la imagen original
      originalImg.size(200, 200); // Establece el tamaño de la imagen original
      originalImg.position(410, 0); // Establece la posición de la imagen original
      p.background(255);
      p.redraw();
    });
  }

  function applyVignetteEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader_v_p.vert', '/showcase/sketches/post_shaders/vignette.frag');
    currentEffect = 'vignette';
  }

  function applyUnfocusEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader_v_p.vert', '/showcase/sketches/post_shaders/unfocus.frag');
    currentEffect = 'unfocus';
  }

  function applyZoomEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader_v_p.vert', '/showcase/sketches/post_shaders/zoom.frag');
    currentEffect = 'zoom';
  }

  // Dibuja la escena
   function draw()  {
    if (!img) return;

    p.shader(shaderProgram);
    shaderProgram.setUniform('u_texture', img);

    if (currentEffect === 'vignette') {
      shaderProgram.setUniform('u_radius', 0.5);
      shaderProgram.setUniform('u_softness', 0.2);
    } else if (currentEffect === 'unfocus') {
      shaderProgram.setUniform('u_blurAmount', 0.02);
    } else if (currentEffect === 'zoom') {
      shaderProgram.setUniform('u_zoomAmount', 1.5);
    }

    // Dibuja un cuadrado con los vértices generados
    p.beginShape();
    for (let i = 0; i < 4; i++) {
      let vertexData = vertices[i];
      p.vertex(vertexData[0], vertexData[1], i % 2, p.floor(i / 2));
    }
    p.endShape(p.CLOSE);
  };

  function changeImageAndEffect() {
    loadImageAndApplyEffect();

    if (currentEffect === 'vignette') {
      applyUnfocusEffect();
    } else if (currentEffect === 'unfocus') {
      applyZoomEffect();
    } else {
      applyVignetteEffect();
    }
  }

  function changeVertexValues() {
    // Genera nuevos valores aleatorios para los vértices
    for (let i = 0; i < 4; i++) {
      vertices[i] = [p.random(-1, 1), p.random(-1, 1)];
    }

    p.redraw(); // Vuelve a dibujar la escena con los nuevos valores
  }

  function changeInterval() {
    // Cambia el intervalo del setInterval
    interval = intervalSlider.value();
    clearInterval(intervalId); // Cancela el intervalo actual utilizando el ID almacenado
    intervalId = setInterval(changeVertexValues, interval); // Establece el nuevo intervalo
  }

  loadImageAndApplyEffect();

 
  p.setup = setup;
  p.draw = draw;
  p.loadImageAndApplyEffect = loadImageAndApplyEffect;
  p.changeInterval = changeInterval;
  p.changeVertexValues = changeVertexValues;
  p.changeImageAndEffect = changeImageAndEffect;
  p.preload = preload;

}, "shader_soft");


```
{{< /details >}}

{{< hint info >}}
### Conclusiones

- Los post efectos implementados con software tardan mucho más en procesar ya que se debe cargar cada pixel.

- Los post efectos con shaders permiten mayor flexibilidad ya que se púede modificar determinadas secciones de una imagen sin iterar sobre cada pixel.

- Se pueden utilizar ambas formas, es decir, tanto por software como por shaders, para implementar proyectos más optimizados. 

{{< /hint >}}



{{< hint danger >}}
 REFERENCIAS:

 Conceptos:
 
 Blur: https://en.wikipedia.org/wiki/Motion_blur
 
 Vignette: https://en.wikipedia.org/wiki/Vignetting

 Proyecto 1:
 Curvas: https://www.youtube.com/watch?v=me04ZrTJqWA&t=745s
 
 Partición de la imagen: https://www.youtube.com/watch?v=-YS5t1R-GO8

 Pryecto 2:
 
 Aplicación de conceptos: https://itp-xstory.github.io/p5js-shaders/#/
 
 Chat GPT

{{< /hint >}}



