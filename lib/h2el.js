module.exports = function h2el(tag, attributes, children) {
  if (!tag) return null
  var element = document.createElement(tag)
  for (var name in attributes) {
    var value = attributes[name]
    element[name] = value
    element.setAttribute(name, value)
  }
  if (children) {
    for (var i = 0; i < children.length; i++) {
      var child = children[i]
      if (!(child instanceof Element)) {
        child = document.createElement("child")
      }
      element.appendChild(child)
    }
  }
  return element
}
