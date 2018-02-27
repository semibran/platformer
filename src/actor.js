export default {
  move(actor, direction) {
    let delta = 0
    if (direction === "left") {
      delta = -1
    } else if (direction === "right") {
      delta = 1
    }
    actor.velocity[0] = actor.stats.speed * delta
  },
  stop(actor) {
    actor.velocity[0] = 0
  },
  jump(actor) {
    if (actor.ground) {
      actor.velocity[1] = -actor.stats.jump
    }
  }
}
