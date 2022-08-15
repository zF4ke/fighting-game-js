const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const canvasWidth = 1024
const canvasHeight = 576

const playerHealthBarElement = document.querySelector("#playerHealthBar")
const enemyHealthBarElement = document.querySelector("#enemyHealthBar")
const timerElement = document.querySelector("#timer")

canvas.width = canvasWidth
canvas.height = canvasHeight

//ctx.fillRect(0, 0, canvas.width, canvas.height)

let prevTime = 0

animate()

function animate() {
  window.requestAnimationFrame(animate)

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  background.update()
  player.update()
  //enemy.update()
  block.update()

  handleControls()
  handleInteractions()

  // FPS

  let delta = (performance.now() - prevTime) / 1000
  let fps = 1 / delta

  prevTime = performance.now()

  //console.log(`FPS: ${fps}`)
}
