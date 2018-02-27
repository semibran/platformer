exports.left = left
exports.right = right
exports.top = top
exports.bottom = bottom
exports.intersects = intersects

function left(hitbox) {
  return hitbox.position[0] - hitbox.halfsize[0]
}

function right(hitbox) {
  return hitbox.position[0] + hitbox.halfsize[0]
}

function top(hitbox) {
  return hitbox.position[1] - hitbox.halfsize[1]
}

function bottom(hitbox) {
  return hitbox.position[1] + hitbox.halfsize[1]
}

function intersects(a, b) {
  return left(a) < right(b)
      && right(a) > left(b)
      && top(a) < bottom(b)
      && bottom(a) > top(b)
}
