// console.log(THREE)
const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 0xed0000})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
const size = { with: 500, height: 500 }
const camera = new THREE.PerspectiveCamera(75, size.with / size.height)
camera.position.z = 3
camera.position.x = 1
camera.position.y = 1
scene.add(camera)
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(size.with, size.height)
renderer.render(scene, camera)
