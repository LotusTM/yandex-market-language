/* eslint-env jest */

const yml = require('../lib/yml')

describe('yml function', () => {
  it('`create` method should create YML', () => {
    expect(yml({
      name: 'BestSeller',
      company: 'Tne Best inc.',
      url: 'http://best.seller.ru'
    }, { validate: false, date: '2017-09-07' }).create().end({ pretty: true })).toMatchSnapshot()
  })
})
