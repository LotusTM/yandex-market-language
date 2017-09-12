const { createYML } = require('./create')
const s = require('./schemas')

const yml = (input, options) => {
  options = Object.assign({
    validate: true
    // date: '2017' // @todo Document possible fixed date in RFC2822 or ISO format
  }, options)

  if (options.validate) s.YMLSchema(input)

  return {
    create: () => createYML(input, options)
  }
}

module.exports = yml
