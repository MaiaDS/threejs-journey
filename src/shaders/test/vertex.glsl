uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uWaveFrequency;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main(){
    vRandom = aRandom;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += aRandom * sin(modelPosition.x * uWaveFrequency.x - uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uWaveFrequency.y - uTime) * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}