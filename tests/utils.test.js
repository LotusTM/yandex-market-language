/* eslint-env jest */

const builder = require('xmlbuilder')
const {
  forNode,
  forNodeEach,
  cleanse
} = require('../lib/utils')

describe('forNode function', () => {
  it('should invoke callback for each element in array for node', () => {
    const xml = forNode(builder.create('root'), { one: 'oneTest', two: 2 }, (parent, key, entry) => {
      parent.node(key).txt(entry)
    })

    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })

  it('should error on non-object', () => {
    expect(() => forNode(builder.create('root'), ['nope'], () => {})).toThrowErrorMatchingSnapshot()
    expect(() => forNode(builder.create('root'), null, () => {})).toThrowErrorMatchingSnapshot()
  })
})

describe('forNodeEach function', () => {
  it('should invoke callback for each element in array for node', () => {
    const xml = forNodeEach(builder.create('root'), ['one', 'two'], (parent, entry, index) => {
      parent.node(index).txt(entry)
    })

    expect(xml.end({ pretty: true })).toMatchSnapshot()
  })

  it('should error on non-array', () => {
    expect(() => forNodeEach(builder.create('root'), { nope: 'nope' }, () => {})).toThrowErrorMatchingSnapshot()
    expect(() => forNodeEach(builder.create('root'), null, () => {})).toThrowErrorMatchingSnapshot()
  })
})

describe('cleanse function', () => {
  it('should cleanse object', () => {
    expect(cleanse({ one: 'test', undefined: undefined })).toMatchSnapshot()
    expect(cleanse({ one: 'test', null: null })).toMatchSnapshot()
    expect(cleanse({ one: 'test', name: 'Ted', age: 100 }, 'name', 'age')).toMatchSnapshot()
  })
})
