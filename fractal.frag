// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

vec2 sinC(vec2 complex) {
  return vec2(sin(complex.x) * cosh(complex.y), cos(complex.x) * sinh(complex.y));
}

vec2 multC(vec2 a, vec2 b) {
  return vec2((a.x * b.x - a.y * b.y), (a.x * b.y + a.y * b.x));
}

void main() { 
  vec4 diffuse_color = vec4 (1.0, 0.0, 0.0, 1.0);

  vec2 c = vec2(cx, cy);
  vec2 z0 = vertTexCoord.st * vec2(6.29, 6.28) - vec2(3.14);
  vec2 z = z0;
  for (int i = 0; i < 20; ++i) z = multC(c, sinC(z));
  if (pow(z.x - z0.x, 2) + pow(z.y - z0.y, 2) < 2500) {
    diffuse_color = vec4(1.0);
  }

  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);

}