import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import Debug from './Utils/Debug.js'

let instance = null
export default class Experience {
    constructor(canvas) {
        // console.log('Here starts a great experience')
        // window.experience = this

        // Singleton
        if(instance) {
            return instance
        }
        instance = this

        this.debug = new Debug()
        this.canvas = canvas
        this.sizes = new Sizes()
        this.sizes.on('resize', () => {
            this.resize()
        })
        this.time = new Time()
        this.time.on('tick', () => {
            this.update()
        })
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) => {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh) {
                child.geometry.dispose()
                // Loop through the material properties
                for(const key in child.material) {
                    const value = child.material[key]
                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })
    }
}