const builder = require('xmlbuilder')
const moment = require('moment')
const { forNode, forNodeEach, cleanse } = require('./utils')

const createDeliveryOptions = (parentNode, input) =>
  forNodeEach(parentNode.node('delivery-options'), input, (deliveryOptions, entry) => {
    const option = deliveryOptions.node('option', cleanse(entry))

    // Sometimes days attribute can be a tuple, it should be formed accordingly
    if (Array.isArray(entry.days)) option.att('days', `${entry.days[0]}-${entry.days[1]}`)
  })

const createOfferPrice = (parentNode, input) => {
  const price = parentNode.node('price')

  return typeof input === 'number'
    ? price.txt(input)
    : price.att(cleanse(input, 'value')).txt(input.value)
}

const createOffer = (parentNode, input) =>
  forNode(parentNode.node('offer'), input, (offer, key, entry) => {
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
        createOfferPrice(offer, entry)
        break

      case 'picture':
      case 'barcode':
        entry.forEach((e) => offer.node(key, {}, e))
        break

      case 'outlets':
        forNodeEach(offer.node(key), entry, (outlets, entry) => {
          outlets.node('outlet', cleanse(entry))
        })
        break

      case 'delivery-options':
        createDeliveryOptions(offer, entry)
        break

      case 'description':
        offer.node(key).dat(entry)
        break

      case 'age':
        offer.node(key, { unit: entry.unit }, entry.value)
        break

      case 'param':
        entry.forEach((e) => offer.node(key, cleanse(e, 'value'), e.value))
        break

      case 'dimensions':
        offer.node(key, {}, entry.join('/'))
        break

      case 'rec':
        offer.node(key, {}, entry.join(','))
        break

      default: offer.node(key, {}, entry)
    }
  })

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
        createDeliveryOptions(yml, entry)
        break

      case 'offers':
        forNodeEach(yml.node(key), entry, (offers, entry) => {
          createOffer(offers, entry)
        })
        break

      default: yml.node(key, {}, entry)
    }
  })

  return yml
}

module.exports = {
  create,
  createDeliveryOptions,
  createOfferPrice,
  createOffer
}
