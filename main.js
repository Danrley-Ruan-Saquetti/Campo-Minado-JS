import Map from "./src/Map.js"
import Block from "./src/Class/Block.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const COLUMNS = 20
const LINES = 10
const DIMENSION = 30
const BOMBS_MAX = Math.round((COLUMNS * LINES) / 8)

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

let map
let animateFrame

function setup() {
    initial()
    window.addEventListener("click", (ev) => map.click(ev.clientX, ev.clientY, 0))
    window.addEventListener("contextmenu", (ev) => map.click(ev.clientX, ev.clientY, 1))
}

function initial() {
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

    const mapBlocks = []
    for (let i = 0; i < LINES; i++) {
        mapBlocks.push([])
        for (let j = 0; j < COLUMNS; j++) {
            let position = { x: i, y: j }
            let dimension = DIMENSION
            let bomb = bombs[i][j]
            let number = 0

            if (i > 0 && i < LINES - 1) {
                if (bombs[i - 1][j]) { number++ }
                if (bombs[i + 1][j]) { number++ }
                if (j > 0 && j < COLUMNS - 1) {
                    if (bombs[i - 1][j + 1]) { number++ }
                    if (bombs[i][j + 1]) { number++ }
                    if (bombs[i + 1][j + 1]) { number++ }
                    if (bombs[i + 1][j - 1]) { number++ }
                    if (bombs[i][j - 1]) { number++ }
                    if (bombs[i - 1][j - 1]) { number++ }
                } else {
                    if (j == 0) {
                        if (bombs[i - 1][j + 1]) { number++ }
                        if (bombs[i][j + 1]) { number++ }
                        if (bombs[i + 1][j + 1]) { number++ }
                    } else {
                        if (bombs[i + 1][j - 1]) { number++ }
                        if (bombs[i][j - 1]) { number++ }
                        if (bombs[i - 1][j - 1]) { number++ }
                    }
                }
            } else {
                if (i == 0) {
                    if (bombs[i + 1][j]) { number++ }
                    if (j > 0 && j < COLUMNS - 1) {
                        if (bombs[i][j + 1]) { number++ }
                        if (bombs[i + 1][j + 1]) { number++ }
                        if (bombs[i + 1][j - 1]) { number++ }
                        if (bombs[i][j - 1]) { number++ }
                    } else {
                        if (j == 0) {
                            if (bombs[i][j + 1]) { number++ }
                            if (bombs[i + 1][j + 1]) { number++ }
                        } else {
                            if (bombs[i + 1][j - 1]) { number++ }
                            if (bombs[i][j - 1]) { number++ }
                        }
                    }
                } else {
                    if (bombs[i - 1][j]) { number++ }
                    if (j > 0 && j < COLUMNS - 1) {
                        if (bombs[i - 1][j + 1]) { number++ }
                        if (bombs[i][j + 1]) { number++ }
                        if (bombs[i][j - 1]) { number++ }
                        if (bombs[i - 1][j - 1]) { number++ }
                    } else {
                        if (j == 0) {
                            if (bombs[i - 1][j + 1]) { number++ }
                        } else {
                            if (bombs[i][j - 1]) { number++ }
                            if (bombs[i - 1][j - 1]) { number++ }
                        }
                    }
                }
            }

            mapBlocks[i].push(new Block(position, dimension, bomb, number))
        }
    }

    map = new Map({ width: CANVAS_DIMENSION.width(), height: CANVAS_DIMENSION.height() }, mapBlocks)

    animate()
}

function animate() {
    map.draw(canvas, ctx)

    if (!map.runningGame) {
        cancelAnimationFrame(animateFrame)
        endGame()
    } else { animateFrame = requestAnimationFrame(animate) }
}

function endGame() {
    map.drawEnd(canvas, ctx)

    setTimeout(initial, 5000)
}

window.onload = setup
