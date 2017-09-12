const { createYML } = require('./create')
const { YML } = require('./schemas')

/**
 * Validate and create YML in form of xmlbuilder XMLElement
 * @param  {object} input          Complex object with specific shape to be converted to YML
 *                                 @link lib/schemas.js/YML
 * @param  {object} [options]      Options
 * @param  {object} [options.validate] = true
 *                                 To validate input against schema or not
 * @param  {object} [options.date] Fixed date to use in RFC2822 or ISO format
 * @return {object} Lib methods
 */
module.exports = (input, options) => {
  options = Object.assign({
    validate: true
  }, options)

  if (options.validate) YML(input)

  return {
    create: (createOptions = options) => createYML(input, createOptions),
    end: (endOptions = options) => createYML(input, options).end(endOptions)
  }
}
