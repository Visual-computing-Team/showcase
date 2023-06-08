precision mediump float;

attribute vec3 aPosition;
varying vec2 vTexCoord;

void main() {
  gl_Position = vec4(aPosition, 1.0);
  vTexCoord = vec2((aPosition.x + 1.0) / 2.0, 1.0 - (aPosition.y + 1.0) / 2.0);
}