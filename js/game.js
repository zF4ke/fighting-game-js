const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)

let prevTime = 0

animate()

function animate() {
  window.requestAnimationFrame(animate)

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  player.update()
  enemy.update()

  handleControls()
  handleInteractions()

  // FPS

  let delta = (performance.now() - prevTime) / 1000
  let fps = 1 / delta

  prevTime = performance.now()

  //console.log(`FPS: ${fps}`)
}
