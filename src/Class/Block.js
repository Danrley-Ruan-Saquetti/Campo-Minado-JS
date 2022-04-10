export default class Block {
    constructor(position, dimension, bomb, number) {
        this.position = position
        this.dimension = dimension
        this.bomb = bomb
        this.number = number
        this.marked = false
        this.reveled = false
    }

    draw(ctx, canvas) {
        if (this.reveled) {
            ctx.font = "15px monospace"
            ctx.fillStyle = "#000"
            ctx.fillText(this.number, this.position.y * this.dimension + 5, this.position.x * this.dimension + 15)
            if (this.bomb) {

            } else {

            }
        } else {
            ctx.fillStyle = "#c2c2c2"
            ctx.fillRect(this.position.y * this.dimension + .01, this.position.x * this.dimension + .01, this.dimension - 1, this.dimension - 1)
            if (this.marked) {

            }
        }
    }
}
