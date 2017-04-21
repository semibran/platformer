const keys = require('keys')(window)
const render = require('./render')
const Actor = require('../engine/actor')
const Stage = require('../engine/stage')
const { spawn, update } = Stage

let hero = Actor({
  width: 16,
  height: 24,
  speed: 0.25,
  bounce: 0.25,
  jump: 7.5
})

let block = Actor({
  width: 80,
  height: 80,
  friction: 0.1
})

let box = Actor({
  width: 32,
  height: 32,
  friction: 0.1
})

let platform = Actor({
  width: 96,
  height: 8,
  friction: 0.1,
  fixed: true
})

let stage = Stage({
  width: 256,
  height: 240,
  friction: 0.1,
  gravity: { x: 0, y: 0.5 }
})

spawn(stage, hero, { x: stage.width * 0.75, y: -hero.height / 2 })
spawn(stage, block, { x: block.width / 2, y: stage.height - block.height / 2 })
spawn(stage, box, { x: stage.width / 2 + box.width / 2, y: stage.height - box.height / 2 })
spawn(stage, platform, { x: stage.width / 2 + platform.width / 2, y: stage.height / 2 + platform.height })

let cache = { player: hero }
let view = render(stage, cache)
document.body.appendChild(view)

next()

function input (keys) {
  if (hero.terrain) {
    if (keys.ArrowLeft) {
      hero.velocity.x -= hero.speed
    }
    if (keys.ArrowRight) {
      hero.velocity.x += hero.speed
    }
    if (keys.ArrowUp) {
      hero.velocity.y = -hero.jump
    }
  }
}

function loop () {
  input(keys)
  update(stage)
  render(stage, cache)
  next()
}

function next () {
  requestAnimationFrame(loop)
}
