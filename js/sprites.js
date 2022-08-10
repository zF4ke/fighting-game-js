const backgroundSpritePath = "../assets/background/placeholder.png"
const defaultBlockSpritePath = "../assets/colors/black.png"
const gravity = 0.4

class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc   
    this.width = this.image.width
    this.height = this.image.height
    this.scale = scale
    this.framesMax = framesMax
    this.frameCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 7
  }

  draw() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      this.image, 
      this.frameCurrent * (this.image.width/this.framesMax),
      0,
      this.image.width/this.framesMax,
      this.image.height,
      this.position.x, 
      this.position.y, 
      (this.image.width/this.framesMax)*this.scale, 
      this.image.height*this.scale
    )

  }

  animate() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameCurrent < this.framesMax-1) {
        this.frameCurrent++
      } else {
        this.frameCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animate()
  }
}

class Fighter extends Sprite {
  constructor({ position, velocity, facing = "right", imageSrc, scale = 1, framesMax = 1, framesHold = 7 }) {
    super({
      position, imageSrc, scale, framesMax
    })

    this.velocity = velocity  
    this.width = this.image.width
    this.height = this.image.height
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
    this.onGround
    this.facing = facing
    this.health = 100
    this.frameCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 7
  }

  fix_collision() {
    let nextPosition = {
      x: this.position.x + this.width*this.scale + this.velocity.x,
      y: this.position.y + this.height*this.scale + this.velocity.y,
    }

    if (nextPosition.y >= canvas.height) {
      this.velocity.y = canvas.height - (this.position.y + this.height*this.scale)

      return true
    }

    return false
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

    if (!this.fix_collision()) {
      this.velocity.y += gravity
    }

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
 
    this.draw()
    this.animate()
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

/* class Block extends Sprite {
  constructor({ position, dimensions, imageSrc, color = "black" }) {
    super({ position, dimensions, imageSrc, color })
  }
} */

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  dimensions: {
    width: 0,
    height: 0,
  },
  imageSrc: backgroundSpritePath,
})

const player = new Fighter({
  position: {
    x: 200,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  facing: "right",
  imageSrc: "../assets/player/idle.png",
  scale: 7,
  framesMax: 11,
  framesHold: 5,
})

/* const enemy = new Fighter({
  position: {
    x: 487,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  facing: "left",
})
 */