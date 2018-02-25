import World from "./world"
import Actor from "./actor"
import render from "./render"
import bind from "../lib/bind"
import morph from "../lib/morph"
import h2el from "../lib/h2el"
import h2node from "../lib/h2node"

const state = {
  world: {
    gravity: 0.25,
    actors: [
      {
        stats: {
          speed: 1.296875,
          jump: -4.87109375
        },
        hitbox: {
          halfsize: [ 8, 12 ],
          position: [ 128, 120 ],
        },
        velocity: [ 0, 0 ],
        ground: null
      }
    ]
  },
  viewport: {
    size: [ 256, 240 ],
    position: [ 128, 120 ]
  }
}

const actions = {
  world: {
    update({ world }) {
      World.update(world)
    }
  },
  actor: {
    move({ world: { actors: [ actor ] } }, direction) {
      Actor.move(actor, direction)
    },
    jump({ world: { actors: [ actor ] } }) {
      Actor.jump(actor)
    }
  }
}

let app = bind(state, actions, update)
let view = render(h2el, app.state, app.actions)
document.body.appendChild(view)
requestAnimationFrame(loop)

function loop() {
  app.actions.world.update()
  requestAnimationFrame(loop)
}

function update(state, actions) {
  let tree = render(h2node, state, actions)
  morph(view, tree)
}
