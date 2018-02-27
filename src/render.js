import stringify from "css-string"

export default (h, { state: { world, viewport } }) =>
  h("div", { class: "world",
      style: stringify({
        width: viewport.size[0] + "px",
        height: viewport.size[1] + "px"
      })
    },
    [
      h("div", { class: "blocks" },
        world.blocks.reduce((elements, block) => {
          let [ halfwidth, halfheight ] = block.halfsize
          let [ x, y ] = block.position
          if (x + halfwidth >= 0
          &&  x - halfwidth < viewport.size[0]
          &&  y + halfheight >= 0
          &&  y - halfheight < viewport.size[1]
          ) {
            elements.push(
              h("div", { class: "element block",
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
      ),
      h("div", { class: "actors" },
        world.actors.reduce((elements, actor) => {
          let [ halfwidth, halfheight ] = actor.hitbox.halfsize
          let [ x, y ] = actor.hitbox.position
          if (x + halfwidth >= 0
          &&  x - halfwidth < viewport.size[0]
          &&  y + halfheight >= 0
          &&  y - halfheight < viewport.size[1]
          ) {
            elements.push(
              h("div", { class: "element actor",
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
    ]
  )
