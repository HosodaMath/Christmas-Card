precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform float mouseX;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
varying vec2 vTexCoord;
varying vec3 vNormal;

void main(){
  vec2 uv = vTexCoord.xy;
  // vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec4 image = texture2D(uTexture1, uv);
  vec4 blur = texture2D(uTexture2, uv);
  float avg = dot(blur.rgb, vec3(0.33333));
  vec4 bloom = mix(blur, image, clamp(avg * (1.0 + mouseX), 0.0, 1.0));

  gl_FragColor = bloom;
}