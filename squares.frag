// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  const float sqrt2div2 = sqrt(2.0) / 2.0;
  float alpha = 1.0;
  vec2 cood = vertTexCoord.st;
  cood = cood - vec2(0.5);
  cood = cood * mat2(sqrt2div2, -sqrt2div2, sqrt2div2, sqrt2div2);
  cood = cood + vec2(0.5);
  for (int i = 0; i < 5; ++i) {
    for (int j = 0; j < 5; ++j) {
      if (i + j > 1 && (5 - i - 1) + j > 1 && i + (5 - j - 1) > 1 && (5 - i - 1) + (5 - j - 1) > 1) {
        if (cood.s > (0.01 + i * 0.2) && cood.s < (0.01 + i * 0.2 + 0.18)
         && cood.t > (0.01 + j * 0.2) && cood.t < (0.01 + j * 0.2 + 0.18)) {
          alpha = 0.0;
        }
      }
    }
  }
  gl_FragColor = vec4(0.2, 0.4, 1.0, alpha);
}

