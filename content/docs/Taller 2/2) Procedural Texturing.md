# 🪩 **Procedural Texturing**

{{< hint danger >}}
<b> Consigna </b>

Adapte otros patrones del libro de shaders y apliquelos a otras figuras 3D.

{{< /hint >}}

## **Marco teórico** 📕

### **¿Qué es el Procedural Texturing?** ❓

El texturizado procedural es una técnica utilizada en gráficos por computadora y diseño de videojuegos para generar texturas de forma automática y algorítmica, en lugar de crearlas manualmente o mediante la utilización de imágenes preexistentes. En lugar de utilizar imágenes o mapas de texturas para aplicar sobre superficies, el texturizado procedural se basa en el uso de algoritmos matemáticos para generar las texturas de manera procedural. Estos algoritmos se definen mediante parámetros y reglas que describen cómo debe generarse la textura en función de características como el color, la forma, la repetición, la variación, entre otros.

{{< hint warning >}}
La principal ventaja del texturizado procedural es su capacidad para generar texturas de forma infinita y sin repetición visible.
{{< /hint >}}

### **Usos del Procedural Texturing** 🖼️

{{< tabs "uniqueid" >}}
{{< tab "Videojuegos" >}}
En la industria de los videojuegos, el texturizado procedural es utilizado para generar texturas detalladas y realistas de forma eficiente. Permite crear paisajes naturales, como terrenos, césped, follaje, así como materiales como piedra, metal, madera y otros efectos visuales. También se utiliza para generar variaciones en texturas de personajes, armas y objetos en el juego, lo que ahorra memoria y permite una mayor personalización.

{{< /tab >}}

{{< tab "Animación">}}
Se utiliza para crear entornos digitales, personajes y efectos visuales. Permite generar texturas detalladas y realistas para escenarios, edificios, vehículos, criaturas, entre otros elementos visuales.

{{< /tab >}}

{{< tab "Realidad virtual y aumentada">}}
El texturizado procedural es utilizado para generar texturas y materiales en tiempo real, lo que permite una mayor interactividad y un menor consumo de recursos.

{{< /tab >}}

{{< tab "Diseño arquitectónico">}}
Se utiliza para generar texturas realistas en entornos virtuales, lo que ayuda a visualizar y presentar proyectos de manera más precisa y detallada.
{{< /tab >}}
{{< /tabs >}}

## **Resultados** 🔍
Se generó una animación visual que combina diferentes figuras geométricas con texturas generadas de forma procedural. Cada vez que se ejecuta, se selecciona aleatoriamente una figura y una textura procedural. La escena se muestra en un lienzo en 3D, y se puede interactuar con ella ajustando el zoom de la textura generada mediante el movimiento del mouse. El resultado es una animación en constante cambio, donde las formas y las texturas se combinan de manera dinámica y visualmente atractiva.

```js
function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  let randomTexture = random(textures);
  truchetShader = readShader(randomTexture);
}

function setup() {
  index = floor(random(figures.length));
  createCanvas(800, 800, WEBGL);
  pg = createGraphics(800, 800, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  pg.shader(truchetShader);
  pg.emitResolution(truchetShader);
  truchetShader.setUniform('u_zoom', 3);
  console.log(pg);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  texture(pg);
}

function draw() {
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  background(32);
  orbitControl();
  figures[index]();
}
```

## **Conclusiones 🤓**
* El texturing procedural permite una mayor flexibilidad y variación en las texturas en diferentes objetos, ya que se pueden ajustar parámetros y reglas para crear efectos visuales únicos y personalizados.

## **Referencias 📚**

{{< hint danger >}}

* Patricio Gonzales Vivo & Jen Lowe (2022, 27 noviembre). The Book of Shaders. https://thebookofshaders.com/09/

{{< /hint >}}