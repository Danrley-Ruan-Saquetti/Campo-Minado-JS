export default class Map {
    constructor(dimension, map) {
        this.dimension = dimension
        this.map = map
        this.runningGame = true
        this.state = 0
    }

    draw(canvas, ctx) {
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, this.dimension.width, this.dimension.height)

        let checkEndGame = true
        let controlEndGame_Click = false
        this.map.forEach((l) => {
            l.forEach((c) => {
                c.draw(ctx)
                if (!c.bomb && !c.reveled) {
                    checkEndGame = false
                } else if (c.bomb) {
                    controlEndGame_Click = true
                }
            })
        })
        if (checkEndGame && controlEndGame_Click) {
            this.runningGame = false
            this.state = 1
        }
    }

    drawEnd(canvas, ctx) {
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, this.dimension.width, this.dimension.height)

        this.map.forEach((l) => {
            l.forEach((c) => {
                c.drawEnd(ctx)
            })
        })
    }

    getBlock(x, y) {
        let i, j
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

        return blockClicked
    }

    click(x, y, T) {
        let blockClicked = this.map[x][y]
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
            if (!blockClicked.bomb) {
                blockClicked.reveled = true
                this.openMap(blockClicked.position.x, blockClicked.position.y)
            } else {
                this.runningGame = false
                this.state = 2
            }
        }
    }

    openMap(i, j) {
        let map = this.map

        if (map[i][j].number == 0) {
            if (i > 0 && i < map.length - 1) {
                if (!map[i - 1][j].reveled && !map[i - 1][j].bomb) {
                    map[i - 1][j].reveled = true
                    this.openMap(i - 1, j)
                }
                if (!map[i + 1][j].reveled && !map[i + 1][j].bomb) {
                    map[i + 1][j].reveled = true
                    this.openMap(i + 1, j)
                }
                if (j > 0 && j < map[0].length - 1) {
                    if (!map[i - 1][j + 1].reveled && !map[i - 1][j + 1].bomb) {
                        map[i - 1][j + 1].reveled = true
                        this.openMap(i - 1, j + 1)
                    }
                    if (!map[i][j + 1].reveled && !map[i][j + 1].bomb) {
                        map[i][j + 1].reveled = true
                        this.openMap(i, j + 1)
                    }
                    if (!map[i + 1][j + 1].reveled && !map[i + 1][j + 1].bomb) {
                        map[i + 1][j + 1].reveled = true
                        this.openMap(i + 1, j + 1)
                    }
                    if (!map[i + 1][j - 1].reveled && !map[i + 1][j - 1].bomb) {
                        map[i + 1][j - 1].reveled = true
                        this.openMap(i + 1, j - 1)
                    }
                    if (!map[i][j - 1].reveled && !map[i][j - 1].bomb) {
                        map[i][j - 1].reveled = true
                        this.openMap(i, j - 1)
                    }
                    if (!map[i - 1][j - 1].reveled && !map[i - 1][j - 1].bomb) {
                        map[i - 1][j - 1].reveled = true
                        this.openMap(i - 1, j - 1)
                    }
                } else {
                    if (j == 0) {
                        if (!map[i - 1][j + 1].reveled && !map[i - 1][j + 1].bomb) {
                            map[i - 1][j + 1].reveled = true
                            this.openMap(i - 1, j + 1)
                        }
                        if (!map[i][j + 1].reveled && !map[i][j + 1].bomb) {
                            map[i][j + 1].reveled = true
                            this.openMap(i, j + 1)
                        }
                        if (!map[i + 1][j + 1].reveled && !map[i + 1][j + 1].bomb) {
                            map[i + 1][j + 1].reveled = true
                            this.openMap(i + 1, j + 1)
                        }
                    } else {
                        if (!map[i + 1][j - 1].reveled && !map[i + 1][j - 1].bomb) {
                            map[i + 1][j - 1].reveled = true
                            this.openMap(i + 1, j - 1)
                        }
                        if (!map[i][j - 1].reveled && !map[i][j - 1].bomb) {
                            map[i][j - 1].reveled = true
                            this.openMap(i, j - 1)
                        }
                        if (!map[i - 1][j - 1].reveled && !map[i - 1][j - 1].bomb) {
                            map[i - 1][j - 1].reveled = true
                            this.openMap(i - 1, j - 1)
                        }
                    }
                }
            } else {
                if (i == 0) {
                    if (!map[i + 1][j].reveled && !map[i + 1][j].bomb) {
                        map[i + 1][j].reveled = true
                        this.openMap(i + 1, j)
                    }
                    if (j > 0 && j < map[0].length - 1) {
                        if (!map[i][j + 1].reveled && !map[i][j + 1].bomb) {
                            map[i][j + 1].reveled = true
                            this.openMap(i, j + 1)
                        }
                        if (!map[i + 1][j + 1].reveled && !map[i + 1][j + 1].bomb) {
                            map[i + 1][j + 1].reveled = true
                            this.openMap(i + 1, j + 1)
                        }
                        if (!map[i + 1][j - 1].reveled && !map[i + 1][j - 1].bomb) {
                            map[i + 1][j - 1].reveled = true
                            this.openMap(i + 1, j - 1)
                        }
                        if (!map[i][j - 1].reveled && !map[i][j - 1].bomb) {
                            map[i][j - 1].reveled = true
                            this.openMap(i, j - 1)
                        }
                    } else {
                        if (j == 0) {
                            if (!map[i][j + 1].reveled && !map[i][j + 1].bomb) {
                                map[i][j + 1].reveled = true
                                this.openMap(i, j + 1)
                            }
                            if (!map[i + 1][j + 1].reveled && !map[i + 1][j + 1].bomb) {
                                map[i + 1][j + 1].reveled = true
                                this.openMap(i + 1, j + 1)
                            }
                        } else {
                            if (!map[i + 1][j - 1].reveled && !map[i + 1][j - 1].bomb) {
                                map[i + 1][j - 1].reveled = true
                                this.openMap(i + 1, j - 1)
                            }
                            if (!map[i][j - 1].reveled && !map[i][j - 1].bomb) {
                                map[i][j - 1].reveled = true
                                this.openMap(i, j - 1)
                            }
                        }
                    }
                } else {
                    if (!map[i - 1][j].reveled && !map[i - 1][j].bomb) {
                        map[i - 1][j].reveled = true
                        this.openMap(i - 1, j)
                    }
                    if (j > 0 && j < map[0].length - 1) {
                        if (!map[i - 1][j + 1].reveled && !map[i - 1][j + 1].bomb) {
                            map[i - 1][j + 1].reveled = true
                            this.openMap(i - 1, j + 1)
                        }
                        if (!map[i][j + 1].reveled && !map[i][j + 1].bomb) {
                            map[i][j + 1].reveled = true
                            this.openMap(i, j + 1)
                        }
                        if (!map[i][j - 1].reveled && !map[i][j - 1].bomb) {
                            map[i][j - 1].reveled = true
                            this.openMap(i, j - 1)
                        }

                        if (!map[i - 1][j - 1].reveled && !map[i - 1][j - 1].bomb) {
                            map[i - 1][j - 1].reveled = true
                            this.openMap(i - 1, j - 1)
                        }
                    } else {
                        if (j == 0) {
                            if (!map[i - 1][j + 1].reveled && !map[i - 1][j + 1].bomb) {
                                map[i - 1][j + 1].reveled = true
                                this.openMap(i - 1, j + 1)
                            }
                        } else {
                            if (!map[i][j - 1].reveled && !map[i][j - 1].bomb) {
                                map[i][j - 1].reveled = true
                                this.openMap(i, j - 1)
                            }
                            if (!map[i - 1][j - 1].reveled && !map[i - 1][j - 1].bomb) {
                                map[i - 1][j - 1].reveled = true
                                this.openMap(i - 1, j - 1)
                            }
                        }
                    }
                }
            }
        }
    }
}
