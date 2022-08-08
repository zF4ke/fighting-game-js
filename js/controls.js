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
    case " ":
      keys.space.pressed = true
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
  }
})

function handleControls() {
  movement()
  attacks()

  function movement() {
    player.velocity.x = 0

    // Left

    if (keys.a.pressed && ["a", "ArrowLeft"].includes(player.lastKeyPressed)) {
      player.velocity.x = -4
      player.facing = "left"
    }

    // Right

    if (keys.d.pressed && ["d", "ArrowRight"].includes(player.lastKeyPressed)) {
      player.velocity.x = 4
      player.facing = "right"
    }

    // Jump

    if (keys.w.pressed) {
      player.velocity.y = -10
    }
  }

  function attacks() {
    if (keys.space.pressed) {
      player.attack()
      keys.space.pressed = false
    }
  }
}
