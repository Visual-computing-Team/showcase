precision mediump float;

attribute vec2 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  vec2 flippedTexCoord = vec2(aTexCoord.x, 1.0 - aTexCoord.y); // Voltea las coordenadas de textura verticalmente
  gl_Position = vec4(aPosition, 0.0, 1.0);
  gl_Position.z = 0.0; // Asegura que la posición en el eje Z sea 0
  gl_Position.xy *= 1.0; // Invierte las coordenadas de posición en los ejes X e Y para la rotación
  vTexCoord = flippedTexCoord;
}
