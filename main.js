import Map from "./src/Map.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const COLUMNS = 15
const LINES = 10
const DIMENSION = 20
const BOMBS_MAX = Math.round((COLUMNS * LINES) / 5)

let map

const CANVAS_DIMENSION = {
    width: () => {
        return DIMENSION * COLUMNS
    },
    height: () => {
        return DIMENSION * LINES
    }
}

canvas.width = CANVAS_DIMENSION.width()
canvas.height = CANVAS_DIMENSION.height()

let animateFrame

function setup() {
    initial()
}

function initial() {
    const childrens = []
    const bombs = []

    for (let i = 0; i < LINES; i++) {
        bombs.push([])
        for (let j = 0; j < COLUMNS; j++) bombs[i].push(false)
    }

    for (let i = 0; i < BOMBS_MAX; i++) {
        let x, y
        do {
            x = Math.round(Math.random() * bombs.length)
            y = Math.round(Math.random() * bombs[0].length)
        } while (x < 0 || x >= bombs.length || y < 0 || y >= bombs[x].length || bombs[x][y]);

        bombs[x][y] = true
    }

    for (let i = 0; i < LINES; i++) {
        childrens.push([])
        for (let j = 0; j < COLUMNS; j++) {
            let position = { x: i, y: j },
                dimension = DIMENSION,
                bomb = bombs[i][j]

            childrens[i].push({ position, dimension, bomb })
        }
    }


    map = new Map(childrens, { width: CANVAS_DIMENSION.width(), height: CANVAS_DIMENSION.height() }, COLUMNS, LINES, bombs)


    map.draw(canvas, ctx)
    map.map.forEach((blocks, i) => {
        ctx.fillStyle = "#000"
        ctx.fillRect(canvas.clientWidth, canvas.clientHeight, blocks[i].dimension, blocks[i].dimension)
        ctx.fillStyle = "#c2c2c2"
        ctx.fillRect(canvas.clientWidth + 1, canvas.clientHeight + 1, blocks[i].dimension - 1, blocks[i].dimension - 1)
    })
    animate()
}

function animate() {
    map.map.forEach((blocks, i) => {

    })
    animateFrame = requestAnimationFrame(animate)
}

window.onload = setup
