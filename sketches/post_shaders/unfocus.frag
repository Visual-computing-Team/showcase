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
