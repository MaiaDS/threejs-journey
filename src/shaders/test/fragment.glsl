varying vec2 vUv;

float random(vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // gl_FragColor = vec4(vUv, 1.0, 1.0); // Pattern 1
    // gl_FragColor = vec4(vUv, 0.0, 1.0); // Pattern 2
    // float strength = vUv.x; // Pattern 3
    // float strength = vUv.y; // Pattern 4
    // float strength = 1.0 - vUv.y; // Pattern 5
    // float strength = vUv.y * 10.0; // Pattern 6
    // float strength = mod(vUv.y * 10.0, 1.0); // Pattern 7
    // float strength = step(0.5,(mod(vUv.y * 10.0, 1.0))); // Pattern 8
    // float strength = step(0.8,(mod(vUv.y * 10.0, 1.0))); // Pattern 9
    // float strength = step(0.8,(mod(vUv.x * 10.0, 1.0))); // Pattern 10
    // float strength = step(0.8,(mod(vUv.x * 10.0, 1.0))) + step(0.8, mod(vUv.y * 10.0, 1.0)); // Pattern 11
    // float strength = step(0.8,(mod(vUv.x * 10.0, 1.0))) * step(0.8, mod(vUv.y * 10.0, 1.0)); // Pattern 12
    // float strength = step(0.4,(mod(vUv.x * 10.0, 1.0))) * step(0.8, mod(vUv.y * 10.0, 1.0)); // Pattern 13
    /** Pattern 14
    * float X = step(0.4,(mod(vUv.x * 10.0, 1.0))) * step(0.8, mod(vUv.y * 10.0, 1.0)); 
    * float Y = step(0.8,(mod(vUv.x * 10.0, 1.0))) * step(0.4, mod(vUv.y * 10.0, 1.0)); 
    * float strength = X + Y; 
    */
    /** Pattern 15
    * float X = step(0.4,(mod(vUv.x * 10.0 - 0.2, 1.0))) * step(0.8, mod(vUv.y * 10.0, 1.0)); 
    * float Y = step(0.8,(mod(vUv.x * 10.0, 1.0))) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0)); 
    * float strength = X + Y; 
    */
    // float strength = abs(vUv.x - 0.5); // Pattern 16
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5)); // Pattern 17
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)); // Pattern 18
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5))); // Pattern 19
    /** Pattern 20
    * float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)))
    * strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    */
    // float strength = floor(vUv.x * 10.0) / 10.0; // Pattern 21
    // float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0; // Pattern 22
    // float strength = random(vUv); // Pattern 23
    // float strength = random(vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0)); // Pattern 24
    // float strength = random(vec2(floor(vUv.x * 10.0) / 10.0, floor((vUv.x * 0.5 + vUv.y) * 10.0) / 10.0)); // Pattern 25
    // float strength = length(vUv); // Pattern 26
    // float strength = distance(vUv, vec2(0.5)); // Pattern 27
    // float strength = 1.0 - distance(vUv, vec2(0.5)); // Pattern 28
    // float strength = 0.015 / (distance(vUv, vec2(0.5))); // Pattern 29
    // float strength = 0.015 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5))); // Pattern 30
    /** Pattern 31 */
    float strength = 0.015 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5))); 
    strength *= 0.015 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
    gl_FragColor = vec4(vec3(strength), 1.0);
}