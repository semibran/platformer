module.exports = function h2node(tag, attributes, children) {
  return {
    tag: tag,
    attributes: attributes || {},
    children: children || []
  }
}
