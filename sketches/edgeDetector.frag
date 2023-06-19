#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform int uApplyEffect;
uniform vec2 uCirclePosition;
uniform float uCircleRadius;
uniform float uEffectIntensity;
uniform float edgeDetectionKernel[25];
uniform int maskType;
uniform int kernelSize;
uniform int effectType;
varying vec2 vTexCoord;


float getKernelValue(int row, int col) {
  if(effectType == 1){
    int middle = kernelSize / 2;
    float center_value;
    float default_value;

    if(maskType == 0 || kernelSize > 3){ //LAPLACIAN OF GAUSSIAN
      default_value = -1.0;
      if(kernelSize == 3) center_value = 8.0;
      if(kernelSize == 5) center_value = 24.0;
      if(kernelSize == 7) center_value = 48.0;
      if(kernelSize == 9) center_value = 72.0;

    }else if(maskType == 1){//LAPLACIAN
      default_value = 0.0;
      center_value = 4.0;

      if(row == 1 && col != middle) return -1.0;
      if(col == 1 && row != middle) return -1.0;

    }else if(maskType == 2){//SOBEL
      default_value = 0.0;
      center_value = 0.0;

      if(row == 0 || row == 2){
        if(col == 0) return -1.0;
        if(col == 2) return 1.0;
      }
      if(row == 1){
        if(col == 0) return -2.0;
        if(col == 2) return 2.0;
      }
      
    }else if(maskType == 3){//KIRSCH
      default_value = 5.0;
      center_value = 0.0;

      if(col == 0) return -3.0;
      if(col == 1 && row != middle) return -3.0;

    } else if(maskType == 4){//ROBINSON
      default_value = 1.0;
      center_value = 0.0;

      if(col == 0) return -1.0;
      if(col == 1) return 0.0;

    } else if(maskType == 5){//ROBERTS}
      default_value = 0.0;
      center_value = 1.0;

      if(row == 2 && col == 2) return -1.0;
    }

    if(row == middle && col == middle) return center_value;
    return default_value;
  }else if(effectType == 2){
    if(maskType == 0){
      return 0.111;
    }else if(maskType == 1){
      return 1.0;
    }else if(maskType == 2){
      if(kernelSize != 5){
        if(col == 0) return 0.299;
        if(col == 1) return 0.587;
        if(col == 2) return 0.114;
        return 0.0;
      }else{
        if (row == 0 && col == 0) return 0.0;
        if (row == 0 && col == 1) return -1.0;
        if (row == 0 && col == 2) return 0.0;
        if (row == 0 && col == 3) return -1.0;
        if (row == 0 && col == 4) return 0.0;

        if (row == 1 && col == 0) return -1.0;
        if (row == 1 && col == 1) return 5.0;
        if (row == 1 && col == 2) return -1.0;
        if (row == 1 && col == 3) return 5.0;
        if (row == 1 && col == 4) return -1.0;

        if (row == 2 && col == 0) return 0.0;
        if (row == 2 && col == 1) return -1.0;
        if (row == 2 && col == 2) return 0.0;
        if (row == 2 && col == 3) return -1.0;
        if (row == 2 && col == 4) return 0.0;

        if (row == 3 && col == 0) return -1.0;
        if (row == 3 && col == 1) return 5.0;
        if (row == 3 && col == 2) return -1.0;
        if (row == 3 && col == 3) return 5.0;
        if (row == 3 && col == 4) return -1.0;

        if (row == 4 && col == 0) return 0.0;
        if (row == 4 && col == 1) return -1.0;
        if (row == 4 && col == 2) return 0.0;
        if (row == 4 && col == 3) return -1.0;
        if (row == 4 && col == 4) return 0.0;

        // If none of the conditions match, return a default value
        return 0.0; // Default value
      }
    }
  }
}


void main() { 
  if(maskType <= 5){

      vec2 onePixel = vec2(1.0, 1.0) / uResolution;

      vec4 colorSum = vec4(0.0);

      if(kernelSize == 3){
        for (int i = 0; i < 3; i++) {
          for (int j = 0; j < 3; j++) {
            vec2 offset = vec2(float(i) - 2.0, float(j) - 2.0) * onePixel;

            vec4 kernel = vec4(getKernelValue(i, j));
            colorSum += texture2D(uSampler, vTexCoord + offset) * kernel;
          }
        }
      }
      if(kernelSize == 5){
        for (int i = 0; i < 5; i++) {
          for (int j = 0; j < 5; j++) {
            vec2 offset = vec2(float(i) - 2.0, float(j) - 2.0) * onePixel;

            vec4 kernel = vec4(getKernelValue(i, j));
            colorSum += texture2D(uSampler, vTexCoord + offset) * kernel;
          }
        }
      }
      if(kernelSize == 7){
        for (int i = 0; i < 7; i++) {
          for (int j = 0; j < 7; j++) {
            vec2 offset = vec2(float(i) - 2.0, float(j) - 2.0) * onePixel;

            vec4 kernel = vec4(getKernelValue(i, j));
            colorSum += texture2D(uSampler, vTexCoord + offset) * kernel;
          }
        }
      }
      if(kernelSize == 9){
        for (int i = 0; i < 9; i++) {
          for (int j = 0; j < 9; j++) {
            vec2 offset = vec2(float(i) - 2.0, float(j) - 2.0) * onePixel;

            vec4 kernel = vec4(getKernelValue(i, j));
            colorSum += texture2D(uSampler, vTexCoord + offset) * kernel;
          }
        }
      }
      float edge = length(colorSum);

      vec2 pixelPosition = vTexCoord * uResolution;
      float distance = length(pixelPosition - uCirclePosition);

      if (uApplyEffect == 1 && distance < uCircleRadius) {
        gl_FragColor = vec4(vec3(edge * uEffectIntensity), 1.0);
      } else {
        gl_FragColor = texture2D(uSampler, vTexCoord);
      }
  }else{
      vec2 onePixel = vec2(1.0, 1.0) / uResolution;

      vec4 color = texture2D(uSampler, vTexCoord);
      vec4 colorX = texture2D(uSampler, vTexCoord + vec2(onePixel.x, 0.0));
      vec4 colorY = texture2D(uSampler, vTexCoord + vec2(0.0, onePixel.y));

      float edgeX = length(color - colorX);
      float edgeY = length(color - colorY);
      float edge = max(edgeX, edgeY);

      // Calculate the distance from the current pixel to the circle center
      vec2 pixelPosition = vTexCoord * uResolution;
      float distance = length(pixelPosition - uCirclePosition);

      if (uApplyEffect == 1 && distance < uCircleRadius) {
        // Apply the effect with the specified intensity
        gl_FragColor = vec4(vec3(edge * uEffectIntensity), 1.0);
      } else {
        gl_FragColor = color; // Display the original image for pixels outside the circle
      }
  }
    
}

