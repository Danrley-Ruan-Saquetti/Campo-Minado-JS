const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

console.log(canvas)

let animateFrame

function animate() {

    animateFrame = requestAnimationFrame(animate)
}