module.exports = function render (stage, cache) {
  if (!cache) {
    cache = {}
  }
  if (!cache.stage) {
    let drawn = cache.stage = document.createElement('div')
    drawn.className = 'stage'
    Object.assign(drawn.style, {
      width: stage.width + 'px',
      height: stage.height + 'px',
      position: 'relative',
      border: 'thick solid black',
      overflow: 'hidden'
    })
  }
  if (!cache.actors) {
    cache.actors = new Map()
  }
  for (let [actor, drawn] of cache.actors) {
    if (!stage.actors.has(actor)) {
      cache.stage.removeChild(drawn)
      cache.actors.delete(drawn)
    }
  }
  for (let actor of stage.actors) {
    let drawn = cache.actors.get(actor)
    if (!drawn) {
      drawn = document.createElement('div')
      drawn.className = 'actor'
      Object.assign(drawn.style, {
        width: actor.width + 'px',
        height: actor.height + 'px',
        position: 'absolute',
        background:
          actor === cache.player
            ? 'green'
            : 'black'
      })
      cache.stage.appendChild(drawn)
      cache.actors.set(actor, drawn)
    }
    drawn.style.left = (actor.position.x - actor.width / 2) + 'px'
    drawn.style.top = (actor.position.y - actor.height / 2) + 'px'
  }
  return cache.stage
}
