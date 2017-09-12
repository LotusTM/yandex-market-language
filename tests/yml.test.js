/* eslint-env jest */

const yml = require('../lib/yml')

describe('yml function', () => {
  it('should throw validation error on wrong input', () => {
    expect(() => yml({ name: 'BestSeller' })).toThrowErrorMatchingSnapshot()
  })

  it('`create` method should create YML', () => {
    expect(yml({ name: 'BestSeller' }, { validate: false, date: '2017-09-07' }).create()).toMatchSnapshot()
  })

  it('`end` method should create and immidiately print YML', () => {
    expect(yml({
      name: 'BestSeller',
      company: 'Tne Best inc.',
      url: 'http://best.seller.ru'
    }, { validate: false, date: '2017-09-07' }).end({ pretty: true })).toMatchSnapshot()
  })
})
