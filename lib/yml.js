const builder = require('xmlbuilder')
const moment = require('moment')
const { forNode, forNodeEach, cleanse } = require('./utils')
const s = require('./schemas')

const buildDeliveryOptions = (node, input) => {
  forNodeEach(node.node('delivery-options'), input, (deliveryOptions, value) => {
    // Sometimes days attribute can be a tuple, it should be formed accordingly
    if (Array.isArray(value.days)) {
      value = Object.assign({}, value, { days: `${value.days[0]}-${value.days[1]}` })
    }

    deliveryOptions.node('option', cleanse(value))
  })
}

const create = (input, options) => {
  const yml = builder
    .create('yml_catalog', { 'version': '1.0', 'encoding': 'UTF-8' })
    .att('date', moment(options.date).format('YYYY-MM-DD HH:mm'))
    .node('shop')

  // Note, we safely iterating upon the input only because it has been already
  // validated against the schemas and thus assumed to contain only allowed properties
  // However, that can fail on you hardly if validation has been forcefully disabled
  forNode(yml, input, (yml, prop, value) => {
    switch (prop) {
      case 'currencies':
        forNodeEach(yml.node(prop), value, (currencies, value) => {
          currencies.node('currency', cleanse(value))
        })
        break

      case 'categories':
        forNodeEach(yml.node(prop), value, (categories, value) => {
          categories.node('category', cleanse(value, 'name'), value.name)
        })
        break

      case 'delivery-options':
        buildDeliveryOptions(yml, value)
        break

      case 'offers':
        forNodeEach(yml.node(prop), value, (offers, value) => {
          forNode(offers.node('offer'), value, (offer, prop, value) => {
            switch (prop) {
              // Those should be attributes according to specs
              case 'id':
              case 'available':
              case 'bid':
              case 'cbid':
              case 'fee':
              case 'group_id':
              case 'type':
                offer.att(prop, value)
                break

              case 'price':
              case 'picture':
              case 'outlets':
                offer.node(prop, {}, value)
                break

              case 'delivery-options':
                buildDeliveryOptions(offer, value)
                break

              case 'age':
              case 'barcode':
              case 'param':
              case 'dimensions':
              case 'rec':
                offer.node(prop, {}, value)
                break

              default: offer.node(prop, {}, value)
            }
          })
        })
        break

      default: yml.node(prop, {}, value)
    }
  })

  return yml.end(options)
}

const yml = (input, options) => {
  options = Object.assign({
    validate: true,
    pretty: true,
    indent: '  ',
    newline: '\n',
    allowEmpty: false,
    spacebeforeslash: ''
    // date: '2017' // @todo Document possible fixed date in RFC2822 or ISO format
  }, options)

  if (options.validate) s.YMLSchema(input)

  return {
    create: () => create(input, options)
  }
}

module.exports = yml
