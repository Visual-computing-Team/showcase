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
