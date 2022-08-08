const gravity = 0.4

class Sprite {
  constructor({ position, velocity, color = "white", facing = "right" }) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.color = color
    this.lastKeyPressed
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: {
        x: 0,
        y: 0,
      },
      width: 110 - this.width / 2.5,
      height: 50,
    }
    this.isAttacking
    this.facing = facing
    this.health = 100
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    //attack box
    if (this.isAttacking) {
      ctx.fillStyle = "red"
      ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      )
    }
  }

  update() {
    // Facing

    if (this.facing === "right") {
      this.attackBox.offset = {
        x: this.width / 2.5,
        y: this.height / 3,
      }
    } else if (this.facing === "left") {
      this.attackBox.offset = {
        x: -this.attackBox.width + this.width - this.width / 2.5,
        y: this.height / 3,
      }
    }

    // AttackBox

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    // Physics

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

    this.draw()
  }

  attack(type) {
    switch (type) {
      default:
        this.isAttacking = true

        setTimeout(() => {
          this.isAttacking = false
        }, 100)
        break
    }
  }
}

const player = new Sprite({
  position: {
    x: 50,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "white",
  facing: "right",
})

const enemy = new Sprite({
  position: {
    x: 487,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "purple",
  facing: "left",
})
