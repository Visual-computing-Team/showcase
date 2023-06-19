
# Texture tinting

{{< hint danger>}}
**Consigna**
<br>
Implementar teñido de textura mezclando datos interpolados de color y texel.
{{< /hint>}}

El objetivo principal de la aplicación es explorar diferentes técnicas de mezcla y tinte de imágenes para crear composiciones visuales nuevas e interesantes. y estéticamente atractivas. Los efectos de tinte permiten modifican o combinar el color general de la imagen con colores adicionales, lo que puede resultar en cambios sutiles o dramáticos en la apariencia de la imagen.

La aplicación presenta una imagen cargada al azar de una selección predefinida. Los usuarios pueden interactuar con la aplicación a través de una interfaz de usuario intuitiva. La interfaz proporciona controles deslizantes y casillas de verificación para ajustar la transparencia, el brillo y la mezcla de colores. También se incluye un selector de modo de mezcla que permite elegir entre una variedad de modos, como "ORIGINAL", "MULTIPLY", "ADD", "DIFFERENCE", "DARKEST" y "LIGHTLEST". A continuación se detalla cada uno:
- **ORIGINAL**: Este modo de mezcla muestra la imagen original sin aplicar ningún cambio. En el shader, simplemente se asigna el valor del píxel de la imagen original al resultado final sin realizar ninguna operación adicional.

- **MULTIPLY**: En este modo de mezcla, se multiplica el color de cada píxel de la imagen original por el color de mezcla. Esto resulta en una apariencia más oscura y con mayor contraste. En el shader, se realiza una multiplicación entre el color del píxel de la imagen original y el color de mezcla.

- **ADD**: En este modo de mezcla, se suma el color de cada píxel de la imagen original con el color de mezcla. Esto produce una imagen más clara y brillante. En el shader, se realiza una suma entre el color del píxel de la imagen original y el color de mezcla.
{{<hint info>}}
Se calcula el mínimo entre 1 y el resultado de la suma, esto para evitar que el color final se salga del rango válido cuyo valor máximo es 1.0.
{{</hint>}}

- **DIFFERENCE**: En este modo de mezcla, se calcula la diferencia entre el color de cada píxel de la imagen original y el color de mezcla. Esto crea un efecto de inversión de colores y produce resultados interesantes, por ejemplo, al seleccionar un color exacto de la imagen para restarlo, esto produce que las zonas de la imagen con ese color se *apaguen* dando como resultado el color negro. En el shader, se calcula la diferencia entre el color del píxel de la imagen original y el color de mezcla.
{{<hint info>}}
Se calcula el máximo entre 0 y el resultado de la resta, esto para evitar que el color final se salga del rango válido cuyo valor mínimo es 0.0.
{{</hint>}}

- **DARKEST**: En este modo de mezcla, se selecciona el color más oscuro entre el color de cada píxel de la imagen original y el color de mezcla. Esto resalta las áreas más oscuras de la imagen. En el shader, se selecciona el color más oscuro entre el color del píxel de la imagen original y el color de mezcla.

- **LIGHTLEST**: En este modo de mezcla, se selecciona el color más claro entre el color de cada píxel de la imagen original y el color de mezcla. Esto resalta las áreas más claras de la imagen. En el shader, se selecciona el color más claro entre el color del píxel de la imagen original y el color de mezcla.


{{< details title="Código para el cálculo de los nuevos colores" open=false >}}
```c++
vec4 texel = texture2D(tex0, vTexCoord);
vec3 blended;

if(blendMode == 0){
  blended = texel.rgb;
}else if(blendMode == 1){
  blended = texel.rgb * blendColor.rgb;
}else if(blendMode == 2){
  blended = min(texel.rgb + blendColor.rgb, 1.0);
}else if(blendMode == 3){
  blended = max(texel.rgb - blendColor.rgb, 0.0);
}else if(blendMode == 4){
  blended = min(texel.rgb, blendColor.rgb);
}else if(blendMode == 5){
  blended = max(texel.rgb, blendColor.rgb);
}

gl_FragColor = vec4(blended, texel.a);

```
{{< /details>}}

## Mezcla (Mixing)

Existe la opción de habilitar el modo de mezclado, el cual utiliza la función *mix()* para realizar la mezcla lineal entre dos colores basada en un factor de mezcla. A la función se le pasan los dos colores: el pixel original y el color a mezclar. Como tercer parámetro para la función, se pasa el componente alfa del color a mezclar. Cuando el factor de mezcla es 0, el resultado es igual al primer color (texel), y cuando el factor de mezcla es 1, el resultado es igual al segundo color (blendColor). Para valores intermedios del factor de mezcla, el resultado será una combinación lineal de los dos colores.
{{<hint info>}}
Es posible modificar el factor de mezcla a través de la interfaz de usuario al habilitar el modo de mezcla (mixing)
{{</hint>}}

{{< details title="Código para el modo de mezcla" open=false >}}
```c++
vec4 texel = texture2D(tex0, vTexCoord);
vec3 blended;
vec4 blended = mix(texel, blendColor, blendColor.a);
gl_FragColor = blended;
```
{{</details>}}

## Brillo (Brightness)
Durante el desarrollo de la aplicación se evidenció que al realizar el entintado utilizando un color de mezcla en escala de grises, es decir modificando los 3 canales rgb al mismo tiempo, esto produce un efecto de brillo sobre la imagen. Por lo tanto se agrega un segundo modo adicional (Brightness) a través del cual se puede modificar la intensidad de brillo sobre la imagen.

{{< details title="Sketch texture mixing" open=false >}}
```js
// Set the tint color based on the slider values
tintRed = red(tintInput.color());
tintGreen = green(tintInput.color());
tintBlue = blue(tintInput.color());

if (mixing) {
  color = [tintRed / 255.0, tintGreen / 255.0, tintBlue / 255.0, sliderTransparent.value()];
} else if(brightness){
  let brightnessValue = sliderBrightness.value() / 255;
  color = [brightnessValue, brightnessValue, brightnessValue];
}else {
    color = [tintRed / 255.0, tintGreen / 255.0, tintBlue / 255.0];
}

// Pass image and tint color to the shader as uniforms
myshader.setUniform('tex0', img);
myshader.setUniform('blendColor', color);

  // Draw the image using the shader
shader(myshader);

  // Render the image on a quad
quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
```
{{</details>}}
{{< p5-iframe sketch="/showcase/sketches/tinting.js?version=4" width="570" height="630" >}}
## Conclusiones
{{< hint info >}}
Al utilizar shaders en lugar de procesamiento directo de píxeles en JavaScript, se logra un rendimiento más eficiente y una mayor velocidad de procesamiento. Los shaders aprovechan la potencia de la GPU para realizar cálculos paralelos, lo que resulta en una aplicación más fluida y con mayor capacidad de respuesta. Los shaders permiten manipular y transformar los colores de los píxeles de manera eficiente, lo que brinda una amplia gama de posibilidades para crear efectos visuales interesantes y atractivos

El uso de shaders y el diseño modular del código permiten una fácil reutilización y adaptación de los efectos visuales en diferentes contextos y proyectos. Los shaders pueden aplicarse a diversas imágenes y se pueden combinar con otros efectos o técnicas para crear resultados aún más complejos y cautivadores.  
{{< /hint >}}



## Referencias
{{< hint danger >}}
  El código antes presentado fue realizado en colaboración con la herramienta de procesado de lenguaje Chat GPT así como el seguimiento de foros y documentación en la web.
  - [Image Processing with WebGL](https://medium.com/eureka-engineering/image-processing-with-webgl-c2af552e8df0)
  - [Blend those colours!](https://www.fxhash.xyz/article/blend-those-colours!)
{{< /hint >}}



