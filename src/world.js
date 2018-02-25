export default {
  update(world) {
    for (let actor of world.actors) {
      actor.hitbox.position[0] += actor.velocity[0]
      actor.hitbox.position[1] += actor.velocity[1]
      actor.velocity[1] += world.gravity
    }
  }
}
