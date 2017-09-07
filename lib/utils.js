const t = require('tcomb')

/**
 * Invoke callback for each property of object for specified node
 * @param  {xmlbuilderNode} node   xmlbuilder node to consider a parent
 * @param  {object}         object Object to iterate upon
 * @param  {Function}       cb     Callback to invoke for each iteration
 * @return {void}
 * @example
 *   forNode(yml.node('offers'), { one: 'oneTest', two: 2 }, (offers, prop, value) => {
 *     offers.node(prop, {}, value)
 *   })
 */
const forNode = (node, object, cb) => {
  t.dict(t.String, t.Any, 'Object')(object)

  for (let prop in object) {
    const value = object[prop]
    cb(node, prop, value)
  }
}

/**
 * Invoke callback for each array item for specified node
 * @param  {xmlbuilderNode} node   xmlbuilder node to consider a parent
 * @param  {array}          array  Array to iterate upon
 * @param  {Function}       cb     Callback to invoke for each iteration
 * @return {void}
 * @example
 *   forNode(yml.node('offers'), [1, 2], (offers, prop, value) => {
 *     offers.node(prop, {}, value)
 *   })
 */
const forNodeEach = (node, array, cb) => {
  t.list(t.Any)(array)

  array.forEach((value, index) => cb(node, value, index))
}

/**
 * Cleans object from undefined and null and specified keys, but
 * preserves 0 or '', which are allowed values for some YML entries
 * Needed, because `xmlbuilder` errors on attributes with `undefined`
 * @param  {object} object  Object to be filtered
 * @param  {string} ...keys Object keys which should be removed
 * @return {object} Shawllow copy of object, but cleaned
 * @example
 *  cleanse({ one: 'test', second: undefined, name: 'Ted' }, 'name') // -> { one: 'test' }
 */
const cleanse = (object, ...keys) => {
  const newObject = Object.assign({}, object)

  Object.keys(object).forEach(key =>
    (object[key] === undefined || object[key] === null || keys.includes(key)) && delete newObject[key]
  )

  return newObject
}

module.exports = {
  forNode,
  forNodeEach,
  cleanse
}
