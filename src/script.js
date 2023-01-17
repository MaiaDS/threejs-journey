import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)

// Animations

// Time
// let time = Date.now()
// const tick = () => {
//     // Time
//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime
//     // Update objects
//     // mesh.position.x += 0.01
//     mesh.rotation.y += 0.001 * deltaTime
//     // Render
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }
// tick()

// Clock 
const clock = new THREE.Clock()
const tick = () => {
    // Clock
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime
    mesh.rotation.y = elapsedTime * Math.PI * 2 // 1 revolution per sec
    mesh.position.y = Math.sin(elapsedTime)
    mesh.position.x = Math.cos(elapsedTime)

    // Animate the camera
    // camera.position.y = Math.sin(elapsedTime)
    // camera.position.x = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

// GSAP
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
// const tick = () => {
//     // Render
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
// }
// tick()