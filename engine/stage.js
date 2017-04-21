module.exports = Stage
Stage.spawn = spawn
Stage.update = update

const Actor = require('./actor')
const { rect } = Actor

const Rect = require('./utils/rect')
const { intersects } = Rect

const Vector2D = require('vector2d')
const { add } = Vector2D

function Stage (opts) {
  let stage = {
    width: 0,
    height: 0,
    friction: 0,
    gravity: { x: 0, y: 0 },
    actors: new Set()
  }
  Object.assign(stage, opts)
  return stage
}

function spawn (stage, actor, position) {
  stage.actors.add(actor)
  actor.position = position
  actor.velocity = { x: 0, y: 0 }
}

function update (stage) {
  for (let actor of stage.actors) {
    move(stage, actor, { x: actor.velocity.x, y: 0 })
    move(stage, actor, { x: 0, y: actor.velocity.y })
    if (!actor.fixed) {
      actor.velocity = add(actor.velocity, stage.gravity)
    }
    if (actor.terrain) {
      let direction = actor.velocity.x / Math.abs(actor.velocity.x)
      if (actor.velocity.x * direction - stage.friction > 0) {
        actor.velocity.x -= actor.terrain.friction * direction
      } else {
        actor.velocity.x = 0
      }
    }
  }
}

function move (stage, actor, delta) {
  actor.position = add(actor.position, delta)
  let terrain = null
  if (actor.position.x - actor.width / 2 < 0) {
    actor.position.x = actor.width / 2
    actor.velocity.x *= -actor.bounce
  }
  // if (actor.position.y - actor.height / 2 < 0) {
  //   actor.position.y = actor.height / 2
  //   actor.velocity.y *= -actor.bounce
  // }
  if (actor.position.x + actor.width / 2 > stage.width) {
    actor.position.x = stage.width - actor.width / 2
    actor.velocity.x *= -actor.bounce
  }
  if (actor.position.y + actor.height / 2 > stage.height) {
    actor.position.y = stage.height - actor.height / 2
    actor.velocity.y *= -actor.bounce
    terrain = stage
  }
  for (let other of stage.actors) {
    if (other !== actor) {
      if (intersects(rect(actor), rect(other))) {
        if (delta.x < 0) {
          actor.position.x = other.position.x + other.width / 2 + actor.width / 2
          actor.velocity.x *= -actor.bounce
        } else if (delta.x > 0) {
          actor.position.x = other.position.x - other.width / 2 - actor.width / 2
          actor.velocity.x *= -actor.bounce
        }
        if (delta.y < 0) {
          actor.position.y = other.position.y + other.height / 2 + actor.height / 2
          actor.velocity.y *= -actor.bounce
        } else if (delta.y > 0) {
          actor.position.y = other.position.y - other.height / 2 - actor.height / 2
          actor.velocity.y *= -actor.bounce
          terrain = other
        }
      }
    }
  }
  if (delta.y) {
    actor.terrain = terrain
  }
}
