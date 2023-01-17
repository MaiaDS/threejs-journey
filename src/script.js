import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group()
group.position.y = -0.5
group.scale.set(0.5,0.5,0.5)
group.rotation.y = Math.PI / 4
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xe0e0e0})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xe0e0e0})
)
cube2.position.x = 2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xe0e0e0})
)
cube3.position.x = 0.5
cube3.position.y = 2
group.add(cube3)

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// // Position
// // mesh.position.x = 0.7
// // mesh.position.y = -0.6
// // mesh.position.z - 1
// mesh.position.set(1,0,1)
// // Scale
// mesh.scale.set(0.5, 0.5, 0.5)
// // Rotation
// mesh.rotation.reorder('YXZ') // always before changing rotation (in uppercase)
// mesh.rotation.y = Math.PI / 4
// mesh.rotation.z = 0
// mesh.rotation.x = Math.PI / 4
// scene.add(mesh)

// Axes helper
const axesHelper = new THREE.AxesHelper(4)
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 500,
    height: 500
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1,0,3)
scene.add(camera)

// lookAt() -> rotate the object so z axe is facing the target
// camera.lookAt(new THREE.Vector3(3,0,0))
// camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)