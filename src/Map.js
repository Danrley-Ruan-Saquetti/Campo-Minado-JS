import Block from "./Class/Block.js"

export default class Map {
    constructor(children, dimension, columns, lines, bombMap) {
        this.columns = columns
        this.lines = lines
        this.dimension = dimension
        this.map = this.generatedBlock(children, this.columns, this.lines, bombMap)
    }

    draw(canvas, ctx) {
        ctx.fillStyle = "#c2c2c2"
        ctx.fillRect(canvas.clientWidth, canvas.clientHeight, this.dimension.width, this.dimension.height)
        this.drawBlock(ctx, canvas)
    }

    drawBlock(ctx, canvas) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                this.map[i][j].draw(ctx, canvas)
            }
        }
    }
}

Map.prototype.generatedBlock = (children, columns, lines, bombMap) => {
    const map = []
    for (let i = 0; i < children.length; i++) {
        map.push([])
        for (let j = 0; j < children[i].length; j++) {
            let position = children[i][j].position,
                dimension = children[i][j].dimension,
                bomb = children[i][j].bomb

            map[i].push(new Block(position, dimension, bomb, columns, lines, bombMap))
        }
    }
    return map
}
