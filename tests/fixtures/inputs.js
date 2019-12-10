const VALID_INPUT = {
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
    { cost: 300, days: [1, 20], 'order-before': 12 }
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
      outlets: [
        { id: '1', instock: 50 },
        { id: '2', instock: 20, booking: true }
      ],
      delivery: true,
      'delivery-options': [
        { cost: 300, days: 0, 'order-before': 12 }
      ],
      name: 'Вафельница First FA-5300',
      vendor: 'First',
      vendorCode: 'A1234567B',
      description: `
        <p>Отличный подарок для любителей венских вафель.</p>
      `,
      sales_notes: 'Необходима предоплата.',
      manufacturer_warranty: true,
      country_of_origin: 'Россия',
      age: { unit: 'month', value: 12 },
      barcode: ['0156789012'],
      param: [
        { name: 'Размер экрана', unit: 'дюйм', value: 27 },
        { name: 'Материал', value: 'алюминий' }
      ],
      dimensions: [20, 30, 40],
      cpa: '1',
      rec: ['123', '456']
    }
  ]
}

const MIN_VALID_INPUT = {
  name: 'BestSeller',
  company: 'Tne Best inc.',
  url: 'http://best.seller.ru',
  currencies: [
    { id: 'RUR', rate: 1 }
  ],
  categories: [
    { id: '1', name: 'Бытовая техника' }
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
      name: 'Вафельница First FA-5300',
      id: '12346',
      price: 1490,
      currencyId: 'RUR',
      categoryId: '101'
    }
  ]
}

const MAX_VALID_INPUT = {
  name: 'BestSeller',
  company: 'Tne Best inc.',
  url: 'http://best.seller.ru',
  platform: 'Wordpress',
  version: '1',
  agency: 'How knows',
  email: 'example@example.com',
  currencies: [
    { id: 'RUR', rate: 1 },
    { id: 'USD', rate: 'CBRF' }
  ],
  categories: [
    { id: '1', name: 'Бытовая техника' },
    { id: '10', parentId: '1', name: 'Мелкая техника для кухни' },
    { id: '101', parentId: '10', name: 'Сэндвичницы и приборы для выпечки' },
    { id: '102', parentId: '10', name: 'Мороженицы' }
  ],
  'delivery-options': [
    { cost: 300, days: [1, 20], 'order-before': 12 }
  ],
  cpa: 0,
  adult: true,
  offers: [
    // Simplified Offer
    {
      name: 'Вафельница First FA-5300',
      model: 'First FA-5300',
      vendor: 'First',
      vendorCode: 'A1234567B',

      id: '1',
      available: true,
      bid: 20,
      cbid: 50,
      fee: 10,
      group_id: '13',
      url: 'http://best.seller.ru/product_page.asp?pid=12348',
      price: { from: true, value: 1500 },
      oldprice: 1200,
      currencyId: 'RUB',
      categoryId: '101',
      picture: ['http://best.seller.ru/img/large_12348.jpg'],
      store: true,
      pickup: true,
      delivery: true,
      outlets: [
        { id: '205', instock: 20, booking: true }
      ],
      'delivery-options': [
        { cost: 900, days: [1, 20], 'order-before': 6 }
      ],
      description: `
        <p>Отличный подарок для любителей венских вафель.</p>
      `,
      sales_notes: 'Необходима предоплата.',
      'min-quantity': 1,
      'step-quantity': 1,
      manufacturer_warranty: true,
      country_of_origin: 'Австралия',
      adult: true,
      age: { unit: 'year', value: 12 },
      barcode: ['0156789012'],
      cpa: 0,
      param: [
        { name: 'Размер экрана', unit: 'дюйм', value: 27 },
        { name: 'Материал', value: 'алюминий' }
      ],
      expiry: '2017-09-12T12:00',
      weight: 50,
      dimensions: [10, 20, 30],
      downloadable: true,
      rec: ['123', '456'],
      vat: 2
    },

    // Free Offer
    {
      type: 'vendor.model',
      typePrefix: 'Вафельница',
      model: 'First FA-5300',
      vendor: 'First',
      vendorCode: 'A1234567B',

      id: '1',
      available: true,
      bid: 20,
      cbid: 50,
      fee: 10,
      group_id: '13',
      url: 'http://best.seller.ru/product_page.asp?pid=12348',
      price: { from: true, value: 1500 },
      oldprice: 1200,
      currencyId: 'RUB',
      categoryId: '101',
      picture: ['http://best.seller.ru/img/large_12348.jpg'],
      store: true,
      pickup: true,
      delivery: true,
      outlets: [
        { id: '205', instock: 20, booking: true }
      ],
      'delivery-options': [
        { cost: 900, days: [1, 20], 'order-before': 6 }
      ],
      description: `
        <p>Отличный подарок для любителей венских вафель.</p>
      `,
      sales_notes: 'Необходима предоплата.',
      'min-quantity': 1,
      'step-quantity': 1,
      manufacturer_warranty: true,
      country_of_origin: 'Австралия',
      adult: true,
      age: { unit: 'year', value: 12 },
      barcode: ['0156789012'],
      cpa: 0,
      param: [
        { name: 'Размер экрана', unit: 'дюйм', value: 27 },
        { name: 'Материал', value: 'алюминий' }
      ],
      expiry: '2017-09-12T12:00',
      weight: 50,
      dimensions: [10, 20, 30],
      downloadable: true,
      rec: ['123', '456'],
      vat: 2
    }
  ]
}

module.exports = {
  VALID_INPUT,
  MIN_VALID_INPUT,
  MAX_VALID_INPUT
}
