import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lilGUI from 'lil-gui'

// GUI
const gui = new lilGUI.GUI()

// Textures 
const textureLoader = new THREE.TextureLoader()
// Door Textures
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// Gradient Textures
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
// Matcaps Textures
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Basic Material
// // const material = new THREE.MeshBasicMaterial({
// //     map: gradientTexture
// // })
// const material = new MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('#e0e0e0') // OR material.color.set(255,154,245)
// // material.wireframe = true
// // material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// // Avoid using Double side in projects because it's heavier (more calculations)
// material.side = THREE.DoubleSide // Default = FrontSide

// Normal Material
// const material = new THREE.MeshNormalMaterial()
// // material.wireframe = true
// material.flatShading = true

// Matcap Materials
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// Depth Material
// const material = new THREE.MeshDepthMaterial()

// Lambert Material
// const material = new THREE.MeshLambertMaterial()

// Phong Material
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 1000
// material.specular = new THREE.Color('blue')

// Toon Material
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// Standard Material
const material = new THREE.MeshStandardMaterial()
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.displacementMap = doorHeightTexture
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.displacementScale = 0.05
material.normalMap = doorNormalTexture
material.transparent = true
material.alphaMap = doorAlphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5,64,64), material)
sphere.position.x = -1.5
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1,100, 100), material)
const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5,0.2,64,128), material)
torus.position.x = 1.5
scene.add(sphere, plane, torus)

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

// Adding lights 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(ambientLight, pointLight)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.1 * elapsedTime
    plane.rotation.x = 0.1 * elapsedTime
    torus.rotation.x = 0.1 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()