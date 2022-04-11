export default class Block {
    constructor(position, dimension, bomb, number) {
        this.position = position
        this.dimension = dimension
        this.bomb = bomb
        this.number = number
        this.reveled = false
        this.marked = false
    }

    draw(ctx, canvas) {
        ctx.fillStyle = "#c2c2c2"
        ctx.fillRect(this.position.y * this.dimension + .01, this.position.x * this.dimension + .01, this.dimension - 1, this.dimension - 1)

        if (this.reveled) {
            let text = ""
            ctx.font = "15px monospace"
            ctx.fillStyle = "#000"
            if (this.bomb) {
                text = "*"
            } else {
                if (this.number != 0) {
                    text = this.number
                }
            }
            ctx.fillText(text, this.position.y * this.dimension + 5, this.position.x * this.dimension + 15)
        } else {
            ctx.fillStyle = "#8d8d8d"
            if (this.marked) {
                ctx.fillStyle = "#ff0000b6"
            }
            ctx.fillRect(this.position.y * this.dimension + 2, this.position.x * this.dimension + 2, this.dimension - 5, this.dimension - 5)
        }
    }


}
