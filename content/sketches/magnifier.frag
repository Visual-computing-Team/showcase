#ifdef GL_ES
precision mediump float;
#endif

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
