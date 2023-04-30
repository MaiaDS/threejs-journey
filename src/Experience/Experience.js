import Sizes from './Utils/Sizes.js'

export default class Experience {
    constructor(canvas) {
        // console.log('Here starts a great experience')
        // window.experience = this
        this.canvas = canvas
        this.sizes = new Sizes()
        this.sizes.on('resize', () => {
            this.resize()
        })
    }

    resize() {}
}