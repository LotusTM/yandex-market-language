/* eslint-env jest */

const builder = require('xmlbuilder')
const {
  yml,
  buildDeliveryOptions,
  buildOfferPrice
} = require('../lib/yml')

describe('yml function', () => {
  it('`create` method should generate YML', () => {
    expect(yml({
      name: 'BestSeller',
      company: 'Tne Best inc.',
      url: 'http://best.seller.ru',
      currencies: [
        { id: 'RUR', rate: 1 },
        { id: 'USD', rate: 60 }
      ],
      categories: [
        { id: '1', name: 'Бытовая техника' },
        { id: '10', parentId: '1', name: 'Мелкая техника для кухни' },
        { id: '101', parentId: '10', name: 'Сэндвичницы и приборы для выпечки' },
        { id: '102', parentId: '10', name: 'Мороженицы' }
      ],
      'delivery-options': [
        {
          cost: 300,
          days: [1, 20],
          'order-before': 12
        }
      ],
      offers: [
        {
          id: '12346',
          available: true,
          bid: 80,
          cbid: 90,
          fee: 325,
          url: 'http://best.seller.ru/product_page.asp?pid=12348',
          price: 1490,
          oldprice: 1620,
          currencyId: 'RUR',
          categoryId: '101',
          picture: ['http://best.seller.ru/img/large_12348.jpg'],
          store: false,
          pickup: true,
          delivery: true,
          'delivery-options': [
            {
              cost: 300,
              days: 0,
              'order-before': 12
            }
          ],
          name: 'Вафельница First FA-5300',
          vendor: 'First',
          vendorCode: 'A1234567B',
          description: `<![CDATA[
            <p>Отличный подарок для любителей венских вафель.</p>
          ]]>`,
          sales_notes: 'Необходима предоплата.',
          manufacturer_warranty: true,
          country_of_origin: 'Россия',
          age: {
            unit: 'month',
            value: 12
          },
          barcode: ['0156789012'],
          cpa: '1',
          rec: ['123', '456']
        }
      ]
    }, { validate: false, date: '2017-09-07' }).create()).toMatchSnapshot()
  })
})

describe('buildDeliveryOptions function', () => {
  it('should build proper nodes with days as empty string', () => {
    const xml = buildDeliveryOptions(builder.create('root'), [{ cost: 300, days: '', 'order-before': 12 }])
    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })

  it('should build proper nodes days as with number', () => {
    const xml = buildDeliveryOptions(builder.create('root'), [{ cost: 300, days: 1, 'order-before': 12 }])
    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })

  it('should build proper nodes with days as tuple', () => {
    const xml = buildDeliveryOptions(builder.create('root'), [{ cost: 300, days: [1, 20], 'order-before': 12 }])
    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })
})

describe('buildOfferPrice function', () => {
  it('should build proper nodes from number', () => {
    const xml = buildOfferPrice(builder.create('root'), 1490)
    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })

  it('should build proper nodes from object', () => {
    const xml = buildOfferPrice(builder.create('root'), { from: true, value: 1490 })
    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })
})
