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
    enemy.health -= 20
    player.isAttacking = false

    enemyHealthBarElement.style.width = enemy.health + "%"
  }
}
