export default class Map {
    constructor(dimension, map) {
        this.dimension = dimension
        this.map = map
    }

    draw(canvas, ctx) {
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, this.dimension.width, this.dimension.height)

        this.map.forEach((l, i) => {
            l.forEach((c, j) => {
                this.map[i][j].draw(ctx)
            })
        })
    }
}
