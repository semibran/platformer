import stringify from "css-string"

export default (h, { world, viewport }, actions) =>
  h("div", { class: "world",
      style: stringify({
        width: viewport.size[0] + "px",
        height: viewport.size[1] + "px"
      })
    },
    world.actors.reduce((elements, actor) => {
      let [ halfwidth, halfheight ] = actor.hitbox.halfsize
      let [ x, y ] = actor.hitbox.position
      if (x + halfwidth >= 0 && x - halfwidth < viewport.size[0]
      &&  y + halfheight >= 0 && y - halfheight < viewport.size[1]
      ) {
        elements.push(
          h("div", { class: "actor",
            style: stringify({
            width: halfwidth * 2 + "px",
            height: halfheight * 2 + "px",
            left: x - halfwidth + "px",
            top: y - halfheight + "px"
            })
          })
        )
      }
      return elements
    }, [])
  )
