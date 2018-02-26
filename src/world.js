export default {
  update(world) {
    for (let actor of world.actors) {
      actor.hitbox.position[0] += actor.velocity[0]
      actor.hitbox.position[1] += actor.velocity[1]
      actor.velocity[1] += world.gravity
      for (let block of world.blocks) {
        if (actor.hitbox.position[1] + actor.hitbox.halfsize[1]
          > block.position[1] - block.halfsize[1]
        ) {
          actor.hitbox.position[1] = block.position[1] - block.halfsize[1] - actor.hitbox.halfsize[1]
          actor.velocity[1] = 0
        }
      }
    }
  }
}
