uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uWaveFrequency;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main(){
    vRandom = aRandom;
    vUv = uv;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += aRandom * 0.1;
    // modelPosition.z += sin(modelPosition.x * uWaveFrequency.x - uTime) * 0.1;
    // modelPosition.z += sin(modelPosition.y * uWaveFrequency.y - uTime) * 0.1;
    float elevation = sin(modelPosition.x * uWaveFrequency.x - uTime) * 0.1;
    elevation +=  sin(modelPosition.x * uWaveFrequency.x - uTime) * 0.1;
    modelPosition.z += elevation;
    vElevation = elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}