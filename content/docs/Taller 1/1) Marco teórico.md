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

<font size="1" color="white"><i>Las propiedades del color: tono, luminosidad y saturación [Imagen]. Extraída de https://www.archipalettes.com/blog/las-propiedades-del-color </i></font>

</div>
{{< hint danger >}}
El <b>ángulo croma no líneal</b> se refiere a la forma en que el matiz se define en el modelo de color HSV, lo que afecta la forma en que se representa el croma o la saturación del color. En el modelo de color HSV, la saturación se mantiene constante mientras el matiz varía, lo que significa que los colores se representan como puntos en un disco en lugar de puntos en una línea, como sucede en otros modelos de color. El ángulo croma no lineal se utiliza para describir la ubicación de cada color en el disco de saturación del modelo de color HSV.

<div align="center">
<img src="/showcase/sketches/basics/HSV Cono.png" width = "40%">

<font size="1" color="white"><i>Las propiedades del color: tono, luminosidad y saturación [Imagen]. Extraída de https://www.archipalettes.com/blog/las-propiedades-del-color </i></font>
</div>
{{< / hint >}}

