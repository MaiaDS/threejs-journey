import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { TorusGeometry } from 'three'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// Textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')

// Fonts
const fontLoader = new FontLoader()
fontLoader.load('/fonts/OverpassBlack.json', (font) => {
    const textGeometry = new TextGeometry('Maïa', { 
        font, 
        size: 0.5, 
        height: 0.2, 
        curveSegments: 12, 
        bevelEnabled: true, 
        bevelThickness: 0.03, 
        bevelSize: 0.02,
        bevelOffset: 0, 
        bevelSegments: 4
    })
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5, 
    //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5, 
    //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
    // )
    textGeometry.center()
    const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
    // const material = new THREE.MeshNormalMaterial()
    const text = new THREE.Mesh(textGeometry, material)
    scene.add(text)
    const torusGeometry = new TorusGeometry(0.3,0.2,20,45)
    for(let i = 0 ; i < 100 ; i++) {
        const torus = new THREE.Mesh(torusGeometry, material)
        torus.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)
        torus.rotation.x = Math.random() * Math.PI
        torus.rotation.y = Math.random() * Math.PI
        const scale  = Math.random()
        torus.scale.set(scale, scale, scale)
        scene.add(torus)
    }
})

// Object
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()