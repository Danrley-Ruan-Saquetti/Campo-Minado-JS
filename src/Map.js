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

    click(x, y, T) {
        let blockClicked
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                const block = this.map[i][j]
                if (block.reveled) continue

                const minX = j * block.dimension
                const maxX = (j * block.dimension) + block.dimension
                const minY = i * block.dimension
                const maxY = (i * block.dimension) + block.dimension

                if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
                    blockClicked = block
                    break
                }
            }
        }
        if (blockClicked != undefined) {
            if (T == 0) this.dig(blockClicked)
            else if (T == 1) this.mark(blockClicked)
        }
    }

    mark(blockClicked) {
        blockClicked.marked = !blockClicked.marked
    }

    dig(blockClicked) {
        if (!blockClicked.marked) {
            blockClicked.reveled = true
        }
    }
}
