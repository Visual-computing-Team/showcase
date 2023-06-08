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