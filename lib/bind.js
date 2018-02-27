module.exports = function bind(state, actions, update) {
  var model = {
    state: state,
    actions: (function walk(actions) {
      var result = {}
      for (var name in actions) {
        if (typeof actions[name] === "object") {
          result[name] = walk(actions[name])
        } else {
          result[name] = (function (action) {
            return function () {
              var result = action
                .bind(null, model)
                .apply(null, arguments)
              if (update) update(model)
              return result
            }
          })(actions[name])
        }
      }
      return result
    })(actions)
  }

  return model
}
