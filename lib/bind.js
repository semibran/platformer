module.exports = function bind(state, actions, update) {
  var bound = (function walk(actions) {
    var result = {}
    for (var name in actions) {
      if (typeof actions[name] === "object") {
        result[name] = walk(actions[name])
      } else {
        result[name] = (function (action) {
          action = action.bind(null, state)
          return function () {
            var result = action.apply(null, arguments)
            update(state, bound)
            return result
          }
        })(actions[name])
      }
    }
    return result
  })(actions)

  return {
    state: state,
    actions: bound
  }
}
