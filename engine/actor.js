module.exports = Actor
Actor.rect = rect

const Rect = require('./utils/rect')

function Actor (opts) {
  let actor = {
    width: 0,
    height: 0,
    speed: 0,
    friction: 0,
    bounce: 0,
    jump: 0,
    fixed: false,
    position: null,
    velocity: null,
    terrain: null
  }
  Object.assign(actor, opts)
  return actor
}

function rect (actor) {
  return Rect(actor.position.x - actor.width / 2, actor.position.y - actor.height / 2, actor.width, actor.height)
}
