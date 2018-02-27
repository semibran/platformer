import listen from "key-state"
import controls from "./controls.json"
import render from "./render"
import World from "./world"
import Actor from "./actor"
import bind from "../lib/bind"
import morph from "../lib/morph"
import h2el from "../lib/h2el"
import h2node from "../lib/h2node"

const state = {
  world: {
    gravity: 0.25,
    blocks: [
      {
        halfsize: [ 96, 16 ],
        position: [ 128, 180 ]
      },
      {
        halfsize: [ 16, 16 ],
        position: [ 48, 148 ]
      }
    ],
    actors: [
      {
        stats: {
          speed: 1.296875,
          jump: 4.87109375
        },
        hitbox: {
          halfsize: [ 8, 12 ],
          position: [ 48, 60 ],
        },
        velocity: [ 0, 0 ],
        ground: null
      }
    ]
  },
  viewport: {
    size: [ 256, 240 ],
    position: [ 128, 120 ]
  },
  input: {
    held: listen(window, controls),
    prev: {}
  }
}

const actions = {
  update({ state, actions }) {
    let commands = resolve(state.input)
    for (let command of commands) {
      actions.actor[command.type](...command.data)
    }
    actions.input.update()
    actions.world.update()
  },
  world: {
    update({ state: { world } }) {
      World.update(world)
    }
  },
  actor: {
    move({ state: { world: { actors: [ actor ] } } }, direction) {
      Actor.move(actor, direction)
    },
    stop({ state: { world: { actors: [ actor ] } } }) {
      Actor.stop(actor)
    },
    jump({ state: { world: { actors: [ actor ] } } }) {
      Actor.jump(actor)
    }
  },
  input: {
    update({ state: { input } }) {
      input.prev = Object.assign(input.prev, input.held)
    }
  }
}

let app = bind(state, actions, update)
let view = render(h2el, app)
document.body.appendChild(view)
requestAnimationFrame(loop)

function update(state, actions) {
  let tree = render(h2node, app)
  view = morph(view, tree)
}

function loop() {
  app.actions.update()
  requestAnimationFrame(loop)
}

function resolve(input) {
  let commands = []
  if (input.held.left && !input.held.right) {
    commands.push({ type: "move", data: [ "left" ] })
  } else if (input.held.right && !input.held.left) {
    commands.push({ type: "move", data: [ "right" ] })
  } else if (!input.held.left && input.prev.left) {
    commands.push({ type: "stop", data: [] })
  } else if (!input.held.right && input.prev.right) {
    commands.push({ type: "stop", data: [] })
  }
  if (input.held.up && !input.prev.up) {
    commands.push({ type: "jump", data: [] })
  }
  return commands
}

