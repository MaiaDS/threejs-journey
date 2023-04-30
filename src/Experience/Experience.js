import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'

export default class Experience {
    constructor(canvas) {
        // console.log('Here starts a great experience')
        // window.experience = this
        this.canvas = canvas
        this.sizes = new Sizes()
        this.sizes.on('resize', () => {
            this.resize()
        })
        this.time = new Time()
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {}

    update() {}
}