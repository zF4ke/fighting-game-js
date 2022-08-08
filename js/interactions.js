function handleInteractions() {
  onPlayerAttackingEnemy()
}

// Player
function onPlayerAttackingEnemy() {
  let isColliding = isRectangularColliding({
    rect1: player.attackBox,
    rect2: enemy,
  })

  if (player.isAttacking && isColliding) {
    console.log("attacking")
    player.isAttacking = false
  }
}
