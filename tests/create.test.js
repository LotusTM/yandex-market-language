/* eslint-env jest */

const builder = require('xmlbuilder')
const {
  createYML,
  createDeliveryOptions,
  createOfferPrice
} = require('../lib/create')
const { VALID_INPUT } = require('./fixtures/inputs')

describe('createYML function', () => {
  it('should create YML', () => {
    expect(createYML(VALID_INPUT, { date: '2017-09-07' }).end({ pretty: true })).toMatchSnapshot()
  })

  // YML specs require those to be always escaped
  // @todo Check ouput in Yandex validator, specs says they should always be &quot; &amp; &gt; &lt; &apos;
  //       while " and ' preserved during escaping
  it(`should escape " & > < '`, () => {
    expect(createYML({
      name: `" & > < '`,
      offers: [
        { description: `<p>" & > < '</p>` }
      ]
    }, { date: '2017-09-07' }).end({ pretty: true })).toMatchSnapshot()
  })
})

describe('createDeliveryOptions function', () => {
  it('should build proper nodes with days as empty string', () => {
    const xml = createDeliveryOptions(builder.create('root'), [{ cost: 300, days: '', 'order-before': 12 }])
    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })

  it('should build proper nodes with days as number', () => {
    const xml = createDeliveryOptions(builder.create('root'), [{ cost: 300, days: 1, 'order-before': 12 }])
    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })

  it('should build proper nodes with days as tuple', () => {
    const xml = createDeliveryOptions(builder.create('root'), [{ cost: 300, days: [1, 20], 'order-before': 12 }])
    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })
})

describe('createOfferPrice function', () => {
  it('should build proper nodes from number', () => {
    const xml = createOfferPrice(builder.create('root'), 1490)
    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })

  it('should build proper nodes from object', () => {
    const xml = createOfferPrice(builder.create('root'), { from: true, value: 1490 })
    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })
})
