module.exports = function morph(element, node) {
  var tag = element.tagName
  var attributes = element.attributes
  var children = element.childNodes
  if (typeof tag !== typeof node.tag || tag !== node.tag) {
    var parent = element.parentNode
    if (parent) {
      var newElement = manifest(node)
      parent.replaceChild(newElement, element)
      return newElement
    } else {
      return element
    }
  }
  for (var i = 0; i < attributes.length; i++) {
    var attribute = attributes[i]
    var name = attribute.name
    if (!node.attributes[name]) {
      element.removeAttribute(name)
    }
  }
  for (var name in node.attributes) {
    var value = node.attributes[name]
    if (typeof value === "function") {
      if (element[name] !== value) {
        element[name] = value
      }
    } else {
      if (element.getAttribute(name) !== value.toString()) {
        element.setAttribute(name, value)
      }
    }
  }
  for (var i = node.children.length; i < children.length; i++) {
    var child = children[i]
    var newChild = node.children[i]
    if (!newChild) {
      element.removeChild(child)
    }
  }
  for (var i = 0; i < node.children.length; i++) {
    var child = children[i]
    var newChild = node.children[i]
    if (!child) {
      element.appendChild(manifest(newChild))
    } else if (child instanceof Element || typeof newChild === "object") {
      morph(child, newChild)
    } else if (child.data !== newChild) {
      child.data = newChild
    }
  }
  return element
}

function manifest(node) {
  if (typeof node !== "object") {
    return document.createTextNode(node)
  }
  var element = document.createElement(node.tag)
  for (var name in node.attributes) {
    var value = node.attributes[name]
    element.setAttribute(name, value)
  }
  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i]
    element.appendChild(manifest(child))
  }
  return element
}
