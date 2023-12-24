precision highp float;
precision highp int;
varying vec3 vNormal;
varying vec2 vTexCoord;
const float PI = 3.14159265359;
const float PI2 = 6.28318530718;
const float TAU = PI2;
const float uTime = 0.0;

vec2 waveEffect(vec2 uv){
  uv.x += 0.0035 * sin(uv.y * 100.0 + uTime * PI2);
  uv.x += 0.0015 * cos(uv.y * 250.0 + uTime * PI2);
  
  uv.y += 0.0035 * sin(uv.x * 100.0 + uTime * PI2);
  uv.y += 0.0015 * cos(uv.x * 250.0 + uTime * PI2);
  
  return uv;
}

/*
  繰り返す(パターン生成など)
*/
vec2 repeat(vec2 position, vec2 size){
  return mod(position, 2.0 * size) - size;
}

// 乱数3
float random3_1(vec3 value){
  return fract(sin(dot(value, vec3(12.9898, 78.233, 19.8321))) * 43758.5453);
}

// ノイズ3
float valueNoise3_1(vec3 value){
  vec3 i = floor(value);
  vec3 f = smoothstep(0.0, 1.0, fract(value));

  float baseMix1 = mix(random3_1(i + vec3(0.0, 0.0, 0.0)), random3_1(i + vec3(1.0, 0.0, 0.0)), f.x);
  float baseMix2 = mix(random3_1(i + vec3(0.0, 1.0, 0.0)), random3_1(i + vec3(1.0, 1.0, 0.0)), f.x);
  float mix1 = mix(baseMix1, baseMix2, f.y);

  float baseMix3 = mix(random3_1(i + vec3(0.0, 0.0, 1.0)), random3_1(i + vec3(1.0, 0.0, 1.0)), f.x);
  float baseMix4 = mix(random3_1(i + vec3(0.0, 1.0, 1.0)), random3_1(i + vec3(1.0, 1.0, 1.0)), f.x);
  float mix2 = mix(baseMix3, baseMix4, f.y);

  float valueMix = mix(mix1, mix2, f.z);

  return valueMix;
}

// fbm3
float fbm3_1(vec3 uv, float g){
  float value = 0.0;
  float amp = 1.0;
  float frequency = 1.0;
  for(int i = 0; i < 4; i++){
    value += amp * valueNoise3_1(frequency * uv) - 0.5;
    amp *= g;
    frequency *= 2.01;
  }

  return 0.5 * value + 0.5;
}

vec4 noiseTexture(vec2 uv, float frequency, float time, vec4 color3, vec4 color4){
  float stepX = uv.x + time * -1.0;
  float stepY = uv.y + time * -1.0;
  vec3 pos = vec3(vec2(stepX, stepY), time * -1.0);
  float noiseTex = 0.0;

  noiseTex += 1.0 * abs(fbm3_1(pos * frequency, 1.0));
  noiseTex += 0.5 * abs(fbm3_1(pos * frequency * 2.0, 1.0));
  noiseTex += 0.25 * abs(fbm3_1(pos * frequency * 4.0, 1.0));
  noiseTex += 0.125 * abs(fbm3_1(pos * frequency * 8.0, 1.0));
  noiseTex += 0.0625 * abs(fbm3_1(pos * frequency * 16.0, 1.0));
    
  vec4 baseColor1 = color3;
  vec4 baseColor2 = color4;
  vec4 color0 = mix(baseColor1, baseColor2, noiseTex);

  return color0;
}

vec4 randomizer4(const vec4 x){
  vec4 z = mod(x, vec4(5612.0));
  z = mod(z, vec4(PI * 2.0));
  return(fract(cos(z) * vec4(56812.5453)));
}

const float A = 1.0;
const float B = 57.0;
const float C = 113.0;
const vec3 ABC = vec3(A, B, C);
const vec4 A3 = vec4(0, B, C, C + B);
const vec4 A4 = vec4(A, A + B, C + A, C + A + B);
float cNoise4(const in vec3 xx){
   vec3 x = mod(xx + 32768.0, 65536.0);
   vec3 ix = floor(x);
   vec3 fx = fract(x);
   vec3 wx = fx * fx * (3.0 - 2.0 * fx);
   float nn = dot(ix, ABC);

   vec4 N1 = nn + A3;
   vec4 N2 = nn + A4;
   vec4 R1 = randomizer4(N1);
   vec4 R2 = randomizer4(N2);
   vec4 R = mix(R1, R2, wx.x);
   float re = mix(mix(R.x, R.y, wx.y), mix(R.z, R.w, wx.y), wx.z);

   return 1.0 - 2.0 * re;
}

float surface3(vec3 uv, float frequency){
  float n = 0.0;
  n += 1.0 * abs(cNoise4(uv * frequency));
  n += 0.5 * abs(cNoise4(uv * frequency * 2.0));
  n += 0.25 * abs(cNoise4(uv * frequency * 4.0));
  n += 0.125 * abs(cNoise4(uv * frequency * 8.0));
  n += 0.0625 * abs(cNoise4(uv * frequency * 16.0));

  return n;
}

void main(){
  
  vec2 uv = vTexCoord.xy;
  // uv = waveEffect(uv);

  // float slowTime = uTime * 0.005;
  float slowTime = 0.1;

  const float loopMax = 3.0;
  vec3 color0 = vec3(0.0);
  vec2 pos = uv;
  for(float i = 0.0; i < loopMax; i++){
    // pos = rotate(pos, slowTime);
    pos = fract(pos * 2.0) - 0.5;
    // pos = rotate(pos, slowTime);
    float d = length(pos);
    float loopScale = 8.0;
    // d = sin(d * loopScale + slowTime) / loopScale;
    d = abs(d);
    d = 0.02 / d;
    // color0 += vec3(0.0, 0.5, 1.0) * d;
    color0 += vec3(uv.x, uv.y, 0.5) * d;
    // color0 += vec3(1.0, uv.x, uv.y) * d;
  }

  float value1 = surface3(vec3(uv * sin(slowTime), slowTime) * mat3(1.0, 0.0, 0.0, 0.0, 0.8, 0.6, 0.0, -0.6, 0.8), 0.9);
  float value2 = surface3(vec3(uv * cos(slowTime), slowTime) * mat3(1.0, 0.0, 0.0, 0.0, 0.8, 0.6, 0.0, -0.6, 0.8), 0.8);
  float lum1 = length(value1);
  float lum2 = length(value2);
  vec3 tc1 = pow(vec3(1.0 - lum1), vec3(sin(uv.x) + cos(slowTime) + 4.0, 8.0 + sin(slowTime) + 4.0, 8.0));
  vec3 tc2 = pow(vec3(1.1 - lum2), vec3(5.0, uv.y + cos(slowTime) + 7.0, sin(uv.x) + sin(slowTime) + 2.0));
  vec3 color1 = (tc1 * 0.8) + (tc2 * 0.5);
  
  vec4 color3 = vec4(uv.x, uv.y,1.0, 1.0);
  vec4 color4 = vec4(0.0, 0.1, 0.3, 1.0);
  vec4 textureColor = noiseTexture(uv, 8.0, uTime * 0.1, color3, color4);
  
  vec4 bgColor = textureColor;
  bgColor *= vec4(color0, 1.0);
  // bgColor += vec4(color1, 1.0);
  // bgColor *= 0.5;

  gl_FragColor = bgColor;
}