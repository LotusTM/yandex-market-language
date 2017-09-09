const t = require('tcomb')

/**
 * Invoke callback for each property of object for specified node
 * @param  {xmlbuilderNode} parentNode xmlbuilder node to consider a parent
 * @param  {object}         object     Object to iterate upon
 * @param  {Function}       cb         Callback to invoke for each iteration
 * @return {xmlbuilderNode} Mutated xmlbuilder node
 * @example
 *   forNode(yml.node('offers'), { one: 'oneTest', two: 2 }, (offers, key, entry) => {
 *     offers.node(key, {}, entry)
 *   })
 */
const forNode = (parentNode, object, cb) => {
  t.dict(t.String, t.Any, 'Object')(object)

  for (let key in object) {
    const entry = object[key]
    cb(parentNode, key, entry)
  }

  return parentNode
}

/**
 * Invoke callback for each array item for specified node
 * @param  {xmlbuilderNode} parentNode xmlbuilder node to consider a parent
 * @param  {array}          array      Array to iterate upon
 * @param  {Function}       cb         Callback to invoke for each iteration
 * @return {xmlbuilderNode} Mutated xmlbuilder node
 * @example
 *   forNodeEach(yml.node('offers'), [1, 2], (offers, entry, index) => {
 *     offers.node(index, { index }, entry)
 *   })
 */
const forNodeEach = (parentNode, array, cb) => {
  t.list(t.Any)(array)

  array.forEach((entry, index) => cb(parentNode, entry, index))

  return parentNode
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
