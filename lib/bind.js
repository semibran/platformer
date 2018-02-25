module.exports = function bind(state, actions, update) {
  var model = {
    state: state,
    actions: null
  }

  model.actions = walk(actions)

  return model

  function walk(actions) {
    var result = {}
    for (var name in actions) {
      if (typeof actions[name] === "object") {
        result[name] = walk(actions[name])
      } else {
        result[name] = (function (action) {
          action = action.bind(null, model.state)
          return function bound() {
            var result = action.apply(null, arguments)
            update(model.state, model.actions)
            return result
          }
        })(actions[name])
      }
    }
    return result
  }
}
