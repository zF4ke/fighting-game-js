const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
  shift: {
    pressed: false,
  }
}

window.addEventListener("keydown", (e) => {
  let key = e.key

  switch (key) {
    case "ArrowLeft":
    case "a":
      keys.a.pressed = true
      player.lastKeyPressed = key

      break
    case "ArrowRight":
    case "d":
      keys.d.pressed = true
      player.lastKeyPressed = key

      break
    case "ArrowUp":
    case "w":
      keys.w.pressed = true

      break
    case "z":
    case " ":
      keys.space.pressed = true
      break
    case "Shift":
      keys.shift.pressed = true

      break
  }

  e.preventDefault()
})

window.addEventListener("keyup", (e) => {
  let key = e.key

  switch (key) {
    case "ArrowLeft":
    case "a":
      keys.a.pressed = false

      break
    case "ArrowRight":
    case "d":
      keys.d.pressed = false

      break
    case "ArrowUp":
    case "w":
      keys.w.pressed = false

      break
    case "Shift":
      keys.shift.pressed = false

      break
  }
})

function handleControls() {
  movement()
  attacks()

  function movement() {
    player.velocity.x = 0
    player.action = "idle"

    // Left

    if (keys.a.pressed && ["a", "ArrowLeft"].includes(player.lastKeyPressed)) {
      player.velocity.x = -3
      player.facing = "left"
      player.action = "walking"
    }

    // Right

    if (keys.d.pressed && ["d", "ArrowRight"].includes(player.lastKeyPressed)) {
      player.velocity.x = 3
      player.facing = "right"
      player.action = "walking"
    }

    // Sprint

    if (keys.shift.pressed && player.action === "walking") {
      player.velocity.x *= 2.7
      player.action = "running"
    }

    // Jump

    if (keys.w.pressed) {
      player.velocity.y = -12
      player.action = "jumping"
    }
  }

  function attacks() {
    if (keys.space.pressed) {
      player.attack()
      keys.space.pressed = false
    }
  }
}
