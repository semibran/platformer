import stringify from "css-string"

export default (h, { world, viewport }, actions) =>
  h("div", { class: "world",
      style: stringify({
        width: viewport.size[0] + "px",
        height: viewport.size[1] + "px"
      })
    },
    world.actors.map(actor => {
      let [ hw, hh ] = actor.hitbox.halfsize
      let [ x, y ] = actor.hitbox.position
      return h("div", { class: "actor",
        style: stringify({
          width: hw * 2 + "px",
          height: hh * 2 + "px",
          left: x - hw + "px",
          top: y - hh + "px"
        })
      })
    })
  )
