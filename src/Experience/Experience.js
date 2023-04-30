import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'

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
        this.camera = new Camera()
    }

    resize() {
        this.camera.resize()
    }

    update() {
        this.camera.update()
    }
}