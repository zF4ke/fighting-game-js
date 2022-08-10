function handleInteractions() {
  //onPlayerCollidingBlock1()
  //onPlayerCollidingBlock2()
  //onPlayerAttackingEnemy()
  
}

// Player
function onPlayerCollidingBlock1() {
  let isColliding = isRectangularColliding({
    rect1: player,
    rect2: block1,
  })

  if (isColliding) {
    player.onGround = true
    player.position.y = block1.position.y - player.height

    if (player.velocity.y > 0) {
      player.velocity.y = 0
    }
  } else {
    player.onGround = false
  }
}

function onPlayerCollidingBlock2() {
  let isColliding = isRectangularColliding({
    rect1: player,
    rect2: block2,
  })

  if (isColliding) {
    player.velocity.x = 0

    if (player.facing == "left") {
      player.position.x = block2.position.x + block2.width + 4
    }
  }
}

function onPlayerAttackingEnemy() {
  let isColliding = isRectangularColliding({
    rect1: player.attackBox,
    rect2: enemy,
  })

  if (player.isAttacking && isColliding) {
    enemy.health -= 20
    player.isAttacking = false

    enemyHealthBarElement.style.width = enemy.health + "%"
  }
}

function isRectangularColliding({ rect1, rect2 }) {
  if (
    /* check on x axis */
    rect1.position.x + rect1.width > rect2.position.x &&
    rect1.position.x < rect2.position.x + rect2.width &&
    /* check on y axis */
    rect1.position.y + rect1.height > rect2.position.y &&
    rect1.position.y < rect2.position.y + rect2.height
  ) {
    return true
  }

  return false
}
