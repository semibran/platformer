module.exports = Rect
Rect.intersects = intersects

function Rect (left, top, width, height) {
  return { left: left, top: top, width: width, height: height }
}

function intersects (rect, other) {
  return rect.left < other.left + other.width && rect.top < other.top + other.height && rect.left + rect.width > other.left && rect.top + rect.height > other.top
}
