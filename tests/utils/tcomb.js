const t = require('tcomb')

module.exports = {
  Absoluteurl: t.refinement(t.String, (u) => /^\/\/|:\/\//.test(u), 'Absolute url'),
  Imagepath: t.refinement(t.String, (i) => /.(jpg|jpeg|gif|png|svg)$/.test(i), 'Image file'),

  /**
   * Ensures that value does not exceed specified length
   * @param  {number}     max  Max or equal length of value
   * @param  {function}   type tcomb Type to be refined. Works with
   *                      anything that have `length` property
   * @return {*} Passed in value
   * @example
   *  Maxlength(12)(t.String)('Hey, this is a long string!')
   */
  Maxlength: (max) => (type) => t.refinement(t.Number(max) && t.Type(type), (t) => t.length <= max, `Maxlength ${max}`)
}
