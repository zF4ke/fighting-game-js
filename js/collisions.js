function isRectangularColliding({ rect1, rect2 }) {
  if (
    /* check on x axis */
    rect1.position.x + rect1.width >= rect2.position.x &&
    rect1.position.x <= rect2.position.x + rect2.width &&
    /* check on y axis */
    rect1.position.y + rect1.height >= rect2.position.y &&
    rect1.position.y <= rect2.position.y + rect2.height
  ) {
    return true
  }

  return false
}
