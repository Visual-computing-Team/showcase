precision mediump float;

uniform sampler2D tex0;
uniform vec4 blendColor; // a vec4 with RGBA values for the blending color
uniform int blendMode;

varying vec2 vTexCoord;

void main() {
  vec4 texel = texture2D(tex0, vTexCoord);
  vec3 blended;

  if(blendMode >= 0 && blendMode <= 5){
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
  }else{
    vec4 blended = mix(texel, blendColor, blendColor.a);
    gl_FragColor = blended;
  }
}
