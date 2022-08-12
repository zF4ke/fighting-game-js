const backgroundSpritePath = "../assets/background/placeholder.png"
const defaultBlockSpritePath = "../assets/colors/black.png"
const gravity = 0.4

class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0} }) {
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
    this.offset = offset
  }

  draw() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      this.image, 
      this.frameCurrent * (this.image.width/this.framesMax),
      0,
      this.image.width/this.framesMax,
      this.image.height,
      this.position.x - this.offset.x, 
      this.position.y - this.offset.y, 
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
  constructor({ 
    position, 
    velocity, 
    facing = "right", 
    imageSrc, 
    scale = 1, 
    framesMax = 1, 
    sprites,
    offset = {x: 0, y: 0}
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
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
    this.facing = facing
    this.health = 100
    this.frameCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 7
    this.action = "idle"
    this.sprites = sprites
    this.offset = offset

    for (const sprite in this.sprites) { 
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrcRight
      sprites[sprite].imageRight = new Image()
      sprites[sprite].imageRight.src = sprites[sprite].imageSrcRight
      sprites[sprite].imageLeft = new Image()
      sprites[sprite].imageLeft.src = sprites[sprite].imageSrcLeft
    }
  }

  fix_collision() {
    let nextPosition = {
      x: this.position.x + this.width*this.scale + this.velocity.x,
      y: this.position.y + this.height*this.scale + this.velocity.y,
    }

    if (nextPosition.y >= canvas.height-100) {
      this.velocity.y = canvas.height - (this.position.y + this.height*this.scale)-100

      return true
    }

    return false
  }

  handle_sprites() {
    switch (this.action) {
      case "idle":
      default:
        this.offset.x = 0
        this.offset.y = -4

        break
      case "walking":
        this.offset.x = 0
        this.offset.y = 0

        break
      case "jumping":
        this.offset.x = 0
        this.offset.y = 0

        break
      case "running":
        this.offset.x = 0
        this.offset.y = -15

        break
    }

    this.image = this.sprites[this.action].image
    this.facing === "left" ? this.image = this.sprites[this.action].imageLeft : this.image = this.sprites[this.action].imageRight
    this.framesMax = this.sprites[this.action].framesMax
    this.framesHold = this.sprites[this.action].framesHold
    this.width = this.image.width/this.framesMax * this.scale
    this.width = this.image.height * this.scale
  }

  draw() {
    ctx.drawImage(
      this.image, 
      this.frameCurrent * (this.image.width/this.framesMax),
      0,
      this.image.width/this.framesMax,
      this.image.height,
      this.position.x - this.offset.x, 
      this.position.y - this.offset.y, 
      (this.image.width/this.framesMax)*this.scale, 
      this.image.height*this.scale
    )
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
    this.handle_sprites()
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

class Block {
  constructor({ position, dimensions, color }) {
    this.position = position
    this.width = dimensions.width
    this.height = dimensions.height
    this.color = color
  }

  collision() {
    // rigidbody collision between player and block
    console.log(`${player.position.x}+${player.width} (${player.position.x + player.width}) > ${this.position.x}`)

    if (player.position.x + player.width > this.position.x) {
      console.log("dentro")
    }
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.collision()
  }
}

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

const block = new Block({
  position: {
    x: 330,
    y: 384,
  },
  dimensions: {
    width: 96,
    height: 96,
  },
  color: "blue",
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
  scale: 4,
  sprites: {
    idle: {
      imageSrcRight: "../assets/player/idle.png",
      imageSrcLeft: "../assets/player/idleFlipped.png",
      framesMax: 11,        
      framesHold: 7,
    },
    walking: {
      imageSrcRight: "../assets/player/walking.png",
      imageSrcLeft: "../assets/player/walkingFlipped.png",
      framesMax: 8,    
      framesHold: 5,
    },
    jumping: {
      imageSrcRight: "../assets/player/jumping.png",
      imageSrcLeft: "../assets/player/jumpingFlipped.png",
      framesMax: 4,    
      framesHold: 5,
    },
    running: {
      imageSrcRight: "../assets/player/running.png",
      imageSrcLeft: "../assets/player/runningFlipped.png",
      framesMax: 10,    
      framesHold: 5,
    }
  }
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