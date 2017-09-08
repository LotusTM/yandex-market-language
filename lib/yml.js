const builder = require('xmlbuilder')
const moment = require('moment')
const { forNode, forNodeEach, cleanse } = require('./utils')
const s = require('./schemas')

const buildDeliveryOptions = (parentNode, input) => {
  const deliveryOptions = parentNode.node('delivery-options')

  forNodeEach(deliveryOptions, input, (deliveryOptions, entry) => {
    // Sometimes days attribute can be a tuple, it should be formed accordingly
    if (Array.isArray(entry.days)) {
      entry = Object.assign({}, entry, { days: `${entry.days[0]}-${entry.days[1]}` })
    }

    deliveryOptions.node('option', cleanse(entry))
  })

  return deliveryOptions
}

const buildOfferPrice = (parentNode, input) => {
  return typeof input === 'number'
    ? parentNode.node('price', {}, input)
    : parentNode.node('price', { from: input.from }, input.value)
}

const create = (input, options) => {
  const yml = builder
    .create('yml_catalog', { 'version': '1.0', 'encoding': 'UTF-8' })
    .att('date', moment(options.date).format('YYYY-MM-DD HH:mm'))
    .node('shop')

  // Note, we safely iterating upon the input only because it has been already
  // validated against the schemas and thus assumed to contain only allowed properties
  // However, that can fail on you hardly if validation has been forcefully disabled
  forNode(yml, input, (yml, key, entry) => {
    switch (key) {
      case 'currencies':
        forNodeEach(yml.node(key), entry, (currencies, entry) => {
          currencies.node('currency', cleanse(entry))
        })
        break

      case 'categories':
        forNodeEach(yml.node(key), entry, (categories, entry) => {
          categories.node('category', cleanse(entry, 'name'), entry.name)
        })
        break

      case 'delivery-options':
        buildDeliveryOptions(yml, entry)
        break

      case 'offers':
        forNodeEach(yml.node(key), entry, (offers, entry) => {
          forNode(offers.node('offer'), entry, (offer, key, entry) => {
            switch (key) {
              // Those should be attributes according to specs
              case 'id':
              case 'available':
              case 'bid':
              case 'cbid':
              case 'fee':
              case 'group_id':
              case 'type':
                offer.att(key, entry)
                break

              case 'price':
                buildOfferPrice(offer, entry)
                break

              case 'picture':
              case 'barcode':
                entry.forEach((e) => offer.node(key, {}, e))
                break

              case 'outlets':
                offer.node(key, {}, entry)
                break

              case 'delivery-options':
                buildDeliveryOptions(offer, entry)
                break

              case 'age':
                offer.node(key, { unit: entry.unit }, entry.value)
                break

              case 'param':
              case 'dimensions':
              case 'rec':
                offer.node(key, {}, entry)
                break

              default: offer.node(key, {}, entry)
            }
          })
        })
        break

      default: yml.node(key, {}, entry)
    }
  })

  return yml
}

const yml = (input, options) => {
  options = Object.assign({
    validate: true
    // date: '2017' // @todo Document possible fixed date in RFC2822 or ISO format
  }, options)

  if (options.validate) s.YMLSchema(input)

  return {
    create: () => create(input, options)
  }
}

module.exports = {
  yml,
  buildDeliveryOptions,
  buildOfferPrice
}
