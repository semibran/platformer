import { left, right, top, bottom, intersects } from "../lib/hitbox.js"

export default {
  update(world) {
    for (let actor of world.actors) {
      let hitbox = actor.hitbox
      actor.ground = null
      move(world, actor, [ actor.velocity[0], 0 ])
      move(world, actor, [ 0, actor.velocity[1] ])
      actor.velocity[1] += world.gravity
    }
  },
}

function move(world, actor, delta) {
  let hitbox = actor.hitbox
  hitbox.position[0] += delta[0]
  hitbox.position[1] += delta[1]
  for (let block of world.blocks) {
    if (intersects(hitbox, block)) {
      if (delta[0] < 0) {
        hitbox.position[0] = right(block) + hitbox.halfsize[0]
        actor.velocity[0] = 0
      } else if (delta[0] > 0) {
        hitbox.position[0] = left(block) - hitbox.halfsize[0]
        actor.velocity[0] = 0
      }
      if (delta[1] < 0) {
        hitbox.position[1] = bottom(block) + hitbox.halfsize[1]
        actor.velocity[1] = 0
      } else if (delta[1] > 0) {
        hitbox.position[1] = top(block) - hitbox.halfsize[1]
        actor.velocity[1] = 0
        actor.ground = block
      }
    }
  }
}
