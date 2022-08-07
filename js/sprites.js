const gravity = 0.4

class Sprite {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
  }

  draw() {
    ctx.fillStyle = "white"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()

    let nextPosition = {
      x: this.position.x + this.width + this.velocity.x,
      y: this.position.y + this.height + this.velocity.y,
    }

    if (nextPosition.y >= canvas.height) {
      this.velocity.y = canvas.height - (this.position.y + this.height)
    } else {
      this.velocity.y += gravity
    }

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
})
