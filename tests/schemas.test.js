/* eslint-env jest */

const { Offer } = require('../lib/schemas')

describe('Offer schema', () => {
  it('should throw on unrecognised offer', () => {
    expect(() => Offer({ id: 'nope' })).toThrowErrorMatchingSnapshot()
  })

  it('should detect and pass Simplified Offer', () => {
    expect(() => Offer({
      name: 'Вафельница First FA-5300',
      id: '12346',
      price: 1490,
      currencyId: 'RUR',
      categoryId: '101'
    })).not.toThrow()
  })

  it('should detect and throw on wrong Simplified Offer', () => {
    expect(() => Offer({ name: 'Вафельница First FA-5300' })).toThrowErrorMatchingSnapshot()
  })

  it('should detect and pass Free Offer', () => {
    expect(() => Offer({
      type: 'vendor.model',
      model: 'XS-10',
      vendor: 'First',
      id: '12346',
      price: 1490,
      currencyId: 'RUR',
      categoryId: '101'
    })).not.toThrow()
  })

  it('should detect and throw on wrong Free Offer', () => {
    expect(() => Offer({ type: 'wrong' })).toThrowErrorMatchingSnapshot()
  })
})
