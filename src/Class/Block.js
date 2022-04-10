export default class Block {
    constructor(position, dimension, bomb, columns, lines, bombMap) {
        this.position = position
        this.dimension = dimension
        this.bomb = bomb
        this.number = this.contBomb(position, columns, lines, this.bomb, bombMap)
    }

    draw(ctx, canvas) {
        ctx.fillStyle = "#000"
        ctx.fillRect(canvas.clientWidth, canvas.clientHeight, this.dimension, this.position)
        ctx.fillStyle = "#c2c2c2"
        ctx.fillRect(canvas.clientWidth + 1, canvas.clientHeight + 1, this.dimension - 1, this.position - 1)
    }
}


Block.prototype.contBomb = (position, columns, lines, bomb, bombMap) => {
    let number = 0

    if (lines > position.x > 0) {
        if (columns > position.y > 0) {
            if (bombMap[position.x - 1][position.y]) { number++ }
            if (bombMap[position.x - 1][position.y + 1]) { number++ }
            if (bombMap[position.x][position.y + 1]) { number++ }
            if (bombMap[position.x + 1][position.y + 1]) { number++ }
            if (bombMap[position.x + 1][position.y]) { number++ }
            if (bombMap[position.x + 1][position.y - 1]) { number++ }
            if (bombMap[position.x][position.y - 1]) { number++ }
            if (bombMap[position.x - 1][position.y - 1]) { number++ }
        } else {
            if (position.y == 0) {
                if (bombMap[position.x - 1][position.y]) { number++ }
                if (bombMap[position.x - 1][position.y + 1]) { number++ }
                if (bombMap[position.x][position.y + 1]) { number++ }
                if (bombMap[position.x + 1][position.y + 1]) { number++ }
                if (bombMap[position.x + 1][position.y]) { number++ }
            } else {
                if (bombMap[position.x - 1][position.y]) { number++ }
                if (bombMap[position.x + 1][position.y]) { number++ }
                if (bombMap[position.x + 1][position.y - 1]) { number++ }
                if (bombMap[position.x][position.y - 1]) { number++ }
                if (bombMap[position.x - 1][position.y - 1]) { number++ }
            }
        }
    } else {
        if (position.x == 0) {
            if (columns > position.y > 0) {
                if (bombMap[position.x][position.y + 1]) { number++ }
                if (bombMap[position.x + 1][position.y + 1]) { number++ }
                if (bombMap[position.x + 1][position.y]) { number++ }
                if (bombMap[position.x + 1][position.y - 1]) { number++ }
                if (bombMap[position.x][position.y - 1]) { number++ }
            } else {
                if (position.y == 0) {
                    if (bombMap[position.x][position.y + 1]) { number++ }
                    if (bombMap[position.x + 1][position.y + 1]) { number++ }
                    if (bombMap[position.x + 1][position.y]) { number++ }
                } else {
                    if (bombMap[position.x][position.y + 1]) { number++ }
                    if (bombMap[position.x + 1][position.y]) { number++ }
                    if (bombMap[position.x + 1][position.y - 1]) { number++ }
                }
            }
        } else {
            if (columns > position.y > 0) {
                if (bombMap[position.x - 1][position.y]) { number++ }
                if (bombMap[position.x - 1][position.y + 1]) { number++ }
                if (bombMap[position.x][position.y + 1]) { number++ }
                if (bombMap[position.x][position.y - 1]) { number++ }
                if (bombMap[position.x - 1][position.y - 1]) { number++ }
            } else {
                if (position.y == 0) {
                    if (bombMap[position.x - 1][position.y]) { number++ }
                    if (bombMap[position.x - 1][position.y + 1]) { number++ }
                    if (bombMap[position.x][position.y + 1]) { number++ }
                } else {
                    if (bombMap[position.x - 1][position.y]) { number++ }
                    if (bombMap[position.x][position.y - 1]) { number++ }
                    if (bombMap[position.x - 1][position.y - 1]) { number++ }
                }
            }
        }
    }

    return number
}
