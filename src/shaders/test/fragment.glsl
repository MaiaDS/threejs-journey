varying vec2 vUv;

void main() {
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // gl_FragColor = vec4(vUv, 0.0, 1.0);
    float strength = vUv.x;
    gl_FragColor = vec4(vec3(strength), 1.0);
}