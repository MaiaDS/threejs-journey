void main() {
    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);

    // Disc
    float strength = 1.0 - step(0.5, distance(gl_PointCoord, vec2(0.5)));
    gl_FragColor = vec4(vec3(strength), 1.0);

}