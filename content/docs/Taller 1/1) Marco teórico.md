# 🤓 <b> Marco Teórico </b>

## ✅ <b> Conceptos básicos </b> 

### • 🎨 Color 
Es una percepción visual que se genera en el cerebro de los humanos y otros animales al interpretar las señales nerviosas que le envían los fotorreceptores en la retina del ojo, que a su vez interpretan y distinguen las distintas longitudes de onda que captan de la parte visible del espectro electromagnético. Todo cuerpo iluminado absorbe una parte de las ondas electromagnéticas y refleja las restantes. Las ondas reflejadas son captadas por el ojo e interpretadas en el cerebro como distintos colores según las longitudes de ondas correspondientes. 

<div align="center">
<img src="/showcase/sketches/basics/color.png">

<font size="1" color="white"><i>Espectro visible [Imagen]. Extraída de https://es.wikipedia.org/wiki/Espectro_visible </i></font>
</div>

### • 🖍️ Matiz o Hue 

El matiz se mide a lo largo de una escala circular, conocida como "rueda de colores", que abarca todo el espectro visible de la luz. En la rueda de colores, los matices se ordenan en un círculo de 360 grados, de manera que los colores opuestos están en lados opuestos del círculo. El matiz son las diferentes variaciones que experimenta un color (tono), conforme se va mezclando con otros colores -en proporciones variables- sin perder su carácter dominante dentro de la mezcla.


<div align="center">
<img src="/showcase/sketches/basics/matiz.png">

<font size="1" color="white"><i>Exploring the real color wheel [Imagen]. Extraída de https://99designs.com/blog/tips/exploring-the-real-color-wheel-in-photoshop/ </i></font>
</div>

{{< hint info >}}
<b>Ejemplo:</b> Los diferentes matices de amarillo se forman cuando el color amarillo se va mezclando en proporciones diferentes con otros colores.  En dichas mezclas, el color amarillo siempre mantendrá su carácter representativo.
<div align="center">
<img src="/showcase/sketches/basics/matiz_amarillo.png" width = "60%">

<font size="1" color="white"><i>Las propiedades del color: tono, luminosidad y saturación [Imagen]. Extraída de https://www.archipalettes.com/blog/las-propiedades-del-color </i></font>
</div>
{{< /hint >}}


### • ✨ Brillo (brightness) o Valor (value)
Es un término que se usa para describir que tan claro u oscuro parece un color, y se refiere a la cantidad de luz percibida. El brillo se puede definir como la cantidad de "oscuridad" que tiene un color, es decir, representa lo claro u oscuro que es un color respecto de su color patrón. Es una medida de la cantidad de luz en el objeto o área que se está iluminando. Factores que afectan a la percepción visual del brillo incluyen la cantidad de luz emitida por la fuente de luz, la distancia entre el objeto o el área que está iluminada y la fuente de luz; y cualquier medio que interviene. 
<div align="center">
<img src="/showcase/sketches/basics/brillo.jpg">

<font size="1" color="white"><i>Brightness [Imagen]. Extraída de http://artnet.nmu.edu/foundations/doku.php?id=brightness </i></font>
</div>

### • 🌞 Luminosidad (lightness)
La luminosidad hace referencia a la cantidad de luz presente en el color con relación al blanco o al negro. Como diríamos de manera coloquial, si es más claro o es más oscuro. Según sea el valor/luminosidad de un determinado color, nos encontraremos con una gama que va desde un color vivo a un color que consideramos apagado o sombreado. Los primeros, los vivos, los interpretamos como más intensos, brillantes o puros, mientras que los apagados se identifican como manchados o sucios.

Es una propiedad importante, ya que va a crear sensaciones espaciales por medio del color. Así, porciones de un mismo color con unas fuertes diferencias de valor (contraste de valor) definen porciones diferentes en el espacio, mientras que un cambio gradual en el valor de un color (gradación) da va a dar sensación de contorno, de continuidad de un objeto en el espacio.

<div align="center">
<img src="/showcase/sketches/basics/luminosidad.png">

<font size="1" color="white"><i>Las propiedades del color: tono, luminosidad y saturación [Imagen]. Extraída de https://www.archipalettes.com/blog/las-propiedades-del-color </i></font>
</div>

### • 🤡 Saturación (saturation)

La saturación es la pureza de un color. Corresponde a la mezcla de blanco puro a un color. Eso significa luz con igual intensidad en todas las longitudes de onda. En otras palabras, la saturación describe la cantidad de gris presente en un color específico: mientras más gris o neutro es, menos brillante o menos "saturado" es. Igualmente, cualquier cambio hecho a un color puro automáticamente baja su saturación. Cuanto más saturado es un color, más puro o intenso se percibe, mientras que un color menos saturado tiene una mezcla de gris y es menos intenso. Un valor de saturación alto significa que el color está más lejos del centro del plano de matiz y saturación, lo que indica que el color es más puro o intenso. 

<div align="center">
<img src="/showcase/sketches/basics/saturacion.png">

<font size="1" color="white"><i>Propiedades de los colores [Imagen]. Extraída de https://desarrolloweb.com/articulos/1503.php </i></font>
</div>

## 🖼️ <b>HSV/HSB (Hue, Saturation, Value/Brightness)</b>
Se trata de una transformación no lineal del espacio de color RGB, y se puede usar en progresiones de color. Nótese que HSV es lo mismo que HSB, pero no que HSL o HSI. En el modelo de color HSV, un color se define por su tono (H), su saturación (S) y su brillo o valor (B/V), <b>por lo que se parece más a la percepción del color humano</b> que a los modelos de color aditivos y sustractivos. Es fácil ajustar un color por su saturación y brillo.

### 🔧 Uso

Este modelo fue creado para aportar tanto información sobre el color en sí como sobre la cantidad y brillo del mismo, representando todo a la vez en un mismo diagrama cromático. Presenta los colores y sus diferentes grados de brillo y saturación en un único diagrama -cónico o circular-. Es bastante usado en las aplicaciones gráficas para que el usuario escoja colores y al mismo tiempo grados de saturación y brillo del mismo. Es común que deseemos elegir un color adecuado para alguna de nuestras aplicaciones, cuando es así resulta muy útil usar la ruleta de color HSV. En ella el matiz se representa por una región circular; una región triangular separada, puede ser usada para representar la saturación y el valor del color. 

### ⚙️ Funcionamiento
El modelo HSB (o HSV, como se prefiera) deriva del espacio RGB y representa los colores combinando tres valores: el matiz en sí (H), la saturación o cantidad de color (S) y el brillo del mismo (B). Estos valores suelen representarse en un diagrama circular (principal uso de este modelo). Estas tres magnitudes pueden tener los siguientes valores:

- <b> H (color en concreto):</b> Valores de 0-360º. La gama cromática se representa en una rueda circular y este valor expresa su posición.  
- <b>S (Saturación):</b> Valores de 0-100%. De menos a más cantidad de color.  
- <b>V (Valor)/B (Brillo):</b> Valores de 0-100%. De totalmente oscuro a la máxima luminosidad.

<div align="center">
<img src="/showcase/sketches/basics/HSV.png" width = "30%">

<font size="1" color="white"><i>Triangulo HSV [Imagen]. Extraída de https://upload.wikimedia.org/wikipedia/commons/1/1b/Triangulo_HSV.png </i></font>

</div>
{{< hint danger >}}
El <b>ángulo croma no líneal</b> se refiere a la forma en que el matiz se define en el modelo de color HSV, lo que afecta la forma en que se representa el croma o la saturación del color. En el modelo de color HSV, la saturación se mantiene constante mientras el matiz varía, lo que significa que los colores se representan como puntos en un disco en lugar de puntos en una línea, como sucede en otros modelos de color. El ángulo croma no lineal se utiliza para describir la ubicación de cada color en el disco de saturación del modelo de color HSV.

<div align="center">
<img src="/showcase/sketches/basics/HSV Cono.png" width = "40%">

<font size="1" color="white"><i>Cono de la coloración HSV [Imagen]. Extraída de https://es.wikipedia.org/wiki/Archivo:Cono_de_la_coloraci%C3%B3n_HSV.png </i></font>
</div>
{{< / hint >}}

## 🖼️ <b>HSL (Hue, Saturation, Lightness)</b>
Este modelo de color es similar al modelo HSB con la diferencia que en este se toma la luminiscencia del color. Sus siglas significan (Hue, Saturation, Lightness). Es un modelo que se representa cilíndricamente mostrando las coordenadas de su gama de colores, se le denomina también modelo de color cilíndricos. Estos modelos de color se crearon en 1970 por Alvy Ray Smith (ingeniero de Pixar) en el campo de los colores digitales para que estos fueran más comprensibles que un modelo RGB. Este tipo de modelo está dentro de los más comunes junto con el HSV.

### 🔧 Uso
El modelo HSL es utilizado principalmente en diseño gráfico, edición de imágenes y otras aplicaciones en las que se necesita especificar un color. El modelo HSL se utiliza para describir la percepción humana del color y es muy útil para manipular y ajustar los colores en una imagen de forma intuitiva. Por ejemplo, con el modelo HSL se pueden modificar la tonalidad, la saturación y la luminosidad de un color para conseguir el efecto deseado.

Además, el modelo HSL también es utilizado en la creación de gradientes y efectos de iluminación en diseño gráfico y en la programación de juegos y aplicaciones. En general, el modelo HSL es muy útil para trabajar con colores de forma más intuitiva y natural, en comparación con otros modelos de color más técnicos como RGB o CMYK.

### ⚙️ Funcionamiento

{{< tabs "uniqueid" >}}
{{< tab "Canal H" >}} 
    Se traduce como tono y representa los colores primarios (rojo, verde y 
    azul) junto con sus matices intermedios, es decir: Naranjas, amarillos, 
    etc. Los valores de tono se refieren mediante su posición en el círculo
    cromático. Queda normalizado que el rojo primario se sitúa a 0º, el 
    verde primario a 120º y el azul primario a 240º, volviendo al rojo 
    cuando regresamos al origen del círculo a 360º.
<div style = "
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    ">
    <img src="/showcase/sketches/basics/canal H.png"
    style = "
        height: 18rem;"
    alt= "canal_H_HSL"
    >
    <p
    style = "font-size:.6rem;
            text-align:center;
        ">Variación del canal H [Imagen]. Extraída de <a>Colorimetry, 2nd Edition, Publication CIE No. 15.2. Commission Internationale de l'Eclairage.</a></p>
</div>
{{< /tab >}}

{{< tab "Canal S" >}} 
    Hace referencia a la cantidad de color, en otras palabras, si la 
    cantidad de color pierde demasiada saturación tenderá a verse gris 
    y al contrario si gana saturación ganará más color. Al igual que 
    la luminosidad, este canal se suele representar como un porcentaje 
    o un rango de valores entre 0 y 1. 
<div style = "
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    ">
    <img src="/showcase/sketches/basics/canal S.png"
    style = "
        height: 18rem;"
    alt= "canal_S_HSL"
    >
    <p
    style = "font-size:.6rem;
            text-align:center;
        ">Variación del canal H [Imagen]. Extraída de <a>Colorimetry, 2nd Edition, Publication CIE No. 15.2. Commission Internationale de l'Eclairage.</a></p>
</div>
{{< /tab >}}

{{< tab "Canal L" >}} 
    En el modelo HSL (Hue, Saturation, Lightness) y similares, la 
    luminosidad se refiere a la cantidad de luz emitida o reflejada por 
    un color en relación con el blanco, es decir, cuánto más claro u 
    oscuro es un color.
<div style = "
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    ">
    <img src="/showcase/sketches/basics/Canal L.png"
    style = "
        height: 18rem;"
    alt= "canal_L_HSL"
    >
    <p
    style = "font-size:.6rem;
            text-align:center;
        ">Variación del canal H [Imagen]. Extraída de <a>Colorimetry, 2nd Edition, Publication CIE No. 15.2. Commission Internationale de l'Eclairage.</a></p>
</div>
{{< /tab >}}
{{< /tabs >}}

## 🖼️ <b>XYZ</b>
Es un modelo que se basa en tres colores primarios (rojo, verde y azul) asignándolos a las variables XYZ. Dado que el ojo humano tiene tres tipos de conos que responden a diferentes rangos de longitudes de onda, este modelo posee una representación de todos los colores visibles en una figura tridimensional.

Sin embargo, el color se puede dividir en tres partes: matiz, luminosidad y saturación. Por ejemplo, el color blanco es un color luminoso, mientras que un gris pálido se considera una versión menos luminosa de ese mismo blanco. La saturación de blanco y gris son los mismos, pero su luminosidad es diferente. Los colores varían su saturación y luminosidad, dependiendo de su ubicación en los ejes del modelo. Este modelo no permitía una definición completa.

<div align="center">
<img src="/showcase/sketches/basics/XYZ.png">

<font size="1" color="white"><i>XYZ [Imagen]. Extraída de http://www.proyectacolor.cl/aplicacion-del-color/modelos-de-color/modelo-cie/#:~:text=El%20modelo%20CIE%20XYZ&text=El%20modelo%20CIE%20deriv%C3%B3%20de,X%2C%20Y%20y%20Z%20respectivamente </i></font>
</div>

### 🔧 Uso
El modelo de color XYZ se utiliza principalmente como un modelo de referencia para otros modelos de color, y se utiliza como punto de partida para la mayoría de las conversiones de color entre diferentes sistemas de color. También es utilizado en la industria de la iluminación para describir la intensidad de la luz, y se utiliza en la medición de colorimetría en instrumentos de medición de color.

### ⚙️ Funcionamiento
El modelo XYZ se utiliza en el medio digital para definir los colores de una imagen en términos de valores numéricos que se pueden almacenar en un archivo digital. Esto permite una representación precisa y consistente del color en diferentes dispositivos y plataformas, ya que los valores numéricos del modelo XYZ son independientes del dispositivo o tecnología de visualización utilizada. Además, el modelo XYZ es ampliamente utilizado como modelo de color de referencia en la investigación y desarrollo de nuevas tecnologías relacionadas con el color, como la impresión en color, la televisión y la fotografía digital.

En el lenguaje de programación P5.js, se pueden utilizar funciones como colorMode() para cambiar el modo de color en el que se está trabajando y color() para definir un color en el modelo XYZ, utilizando los valores de X, Y y Z como parámetros. También se pueden utilizar librerías como chroma.js para trabajar con el modelo XYZ en JavaScript.

Es importante tener en cuenta que el modelo XYZ es un modelo de color no perceptual, lo que significa que no tiene en cuenta las diferencias en la percepción del color por parte del ojo humano. Por lo tanto, es necesario utilizar modelos de color perceptuales, como el modelo CIELAB o el modelo CIELUV, para realizar ajustes de color precisos y realistas.

## Referencias

{{< hint danger >}}
 
Sharma, G., Wu, W., & Dalal, E. N. (2005). The CIEDE2000 color‐difference formula: Implementation notes, supplementary test data, and mathematical observations. Color research & application, 30(1), 21-30.

"Color Appearance Models, Second Edition" de Mark D. Fairchild:
Fairchild, M. D. (2005). Color Appearance Models (2nd ed.). Wiley-Interscience.

"Colorimetry, CIE publication 15.2" de la Commission Internationale de l'Eclairage:
CIE. (1986). Colorimetry, 2nd Edition, Publication CIE No. 15.2. Commission Internationale de l'Eclairage.

Propiedades de los colores. (18 de mayo de 2004). Desarrollo Web. Recuperado de https://desarrolloweb.com/articulos/1503.php

Pérez, V. (6 de abril de 2020). Más propiedades del color: tono, brillo y saturación. Envero. Recuperado de https://www.enverodeco.es/blog/propiedades-del-color-tono-brillo-y-saturacion

Color. (27 de enero de 2023). Wikipedia. Recuperado de https://es.wikipedia.org/wiki/Color

Modelo de color HSV. (18 de diciembre de 2022). Wikipedia. Recuperado de https://es.wikipedia.org/wiki/Modelo_de_color_HSV

Modos o modelos de color HSB (o HSV) y códigos hexadecimales: qué son y usos específicos. (s.f). Recuperado de https://www.comunicacion-multimedia.info/2010/05/modos-o-modelos-de-color-hsb-o-hsv-y.html

{{< /hint >}}