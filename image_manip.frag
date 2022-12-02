// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;
uniform sampler2D my_mask;
uniform float blur_flag;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 

  // grab the color values from the texture and the mask
  vec4 diffuse_color = vec4(0.0);
  vec4 mask_color = texture2D(my_mask, vertTexCoord.xy);

  // half sheep, half mask
  if (mask_color.r < 0.1) {
    for (int i = -5; i <= 5; ++i) {
      for (int j = -5; j <= 5; ++j) {
        diffuse_color += texture2D(my_texture, vertTexCoord.xy - vec2(i * 0.001, j * 0.001));
      }
    }
    diffuse_color /= vec4(121);
  } else if (mask_color.r < 0.5) {
    for (int i = -2; i <= 2; ++i) {
      for (int j = -2; j <= 2; ++j) {
        diffuse_color += texture2D(my_texture, vertTexCoord.xy - vec2(i * 0.001, j * 0.001));
      }
    }
    diffuse_color /= vec4(25);
  } else {
    diffuse_color = texture2D(my_texture, vertTexCoord.xy);
  }

  if (blur_flag != 0.0) {
    diffuse_color = texture2D(my_texture, vertTexCoord.xy);
  }

  // simple diffuse shading model
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);

  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
}
