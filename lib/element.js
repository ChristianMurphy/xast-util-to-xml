'use strict'

var all = require('./all')
var name = require('./name')
var value = require('./value')

module.exports = serializeElement

// Serialize an element.
function serializeElement(node, config) {
  var nodeName = name(node.name)
  var content = all(node, config)
  var attributes = node.attributes || {}
  var close = content ? false : config.close
  var attrs = []
  var key
  var result

  for (key in attributes) {
    result = attributes[key]

    if (result !== null && result !== undefined) {
      attrs.push(name(key) + '=' + value(result, config))
    }
  }

  return (
    '<' +
    nodeName +
    (attrs.length === 0 ? '' : ' ' + attrs.join(' ')) +
    (close ? (config.tight ? '' : ' ') + '/' : '') +
    '>' +
    content +
    (close ? '' : '</' + nodeName + '>')
  )
}
