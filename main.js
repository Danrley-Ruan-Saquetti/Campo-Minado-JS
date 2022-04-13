import Map from "./src/Map.js"
import Block from "./src/Class/Block.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let COLUMNS = 20
let LINES = 10
const DIMENSION = 30
let BOMBS_MAX = Math.round((COLUMNS * LINES) / 8)

const WINDOW_DIMENSION = {
    height: () => { return window.innerHeight },
    width: () => { return window.innerWidth }
}

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

resizeCanvas()

let map
let animateFrame

function setup() {
    checkWindowSize_Canvas()

    canvas.addEventListener("click", (ev) => {
        map.click((ev.clientX) - canvas.offsetLeft, (ev.clientY) - canvas.offsetTop, 0)
    })
    canvas.addEventListener("contextmenu", (ev) => {
        ev.preventDefault()
        map.click((ev.clientX) - canvas.offsetLeft, (ev.clientY) - canvas.offsetTop, 1)
    })
    document.getElementById("start").addEventListener("click", () => {
        const difficulty = Number(document.getElementById("difficulty").value)

        if (difficulty != 0) {
            let columns, lines
            switch (difficulty) {
                case 1:
                    columns = 12
                    lines = 10
                    break;
                case 2:
                    columns = 14
                    lines = 10
                    break;
                case 3:
                    columns = 17
                    lines = 12
                    break;
                case 4:
                    columns = 20
                    lines = 14
                    break;
            }
            initial(columns, lines)
        } else {
            alert("Por favor, informe a dificuldade da partida")
        }
    })
}

function menu() {
    document.getElementById("result").classList.toggle("on")
    document.getElementById("menu").classList.toggle("on")
    canvas.classList.toggle("on")
}

function initial(columns, lines) {
    COLUMNS = columns
    LINES = lines
    BOMBS_MAX = Math.round((COLUMNS * LINES) / 8)

    canvas.width = CANVAS_DIMENSION.width()
    canvas.height = CANVAS_DIMENSION.height()

    menu()

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

function checkWindowSize_Canvas() {
    if (canvas.clientLeft != (WINDOW_DIMENSION.width() / canvas.clientWidth) / 2 ||
        canvas.clientTop != (WINDOW_DIMENSION.height() / canvas.clientHeight) / 2) {
        resizeCanvas()
    }

    requestAnimationFrame(checkWindowSize_Canvas)
}

function resizeCanvas() {
    canvas.style.top = ((WINDOW_DIMENSION.height() - canvas.clientHeight) / 2) + "px"
    canvas.style.left = ((WINDOW_DIMENSION.width() - canvas.clientWidth) / 2) + "px"
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

    const result = document.getElementById("result")
    if (map.state) {
        result.innerHTML = "Você perdeu!"
    } else {
        result.innerHTML = "Parabéns você ganhou!"
    }
    result.classList.toggle("on")

    setTimeout(menu, 3000)
}

window.onload = setup
