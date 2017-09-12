/* eslint-env jest */

const t = require('tcomb')
const r = require('./refinements')

describe('Tcomb refinement', () => {
  describe('Absoluteurl', () => {
    it('should pass absolute url', () => {
      expect(r.Absoluteurl('http://test.com')).toMatchSnapshot()
      expect(r.Absoluteurl('https://test.com')).toMatchSnapshot()
      expect(r.Absoluteurl('//test.com')).toMatchSnapshot()
    })
    it('should error on everything except absolute url', () => {
      expect(() => r.Absoluteurl(true)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl('/url')).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl('url/')).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl('url')).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(-1)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(1)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(-1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(0)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(null)).toThrowErrorMatchingSnapshot()
      expect(() => r.Absoluteurl(undefined)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('Imagepath', () => {
    it('should pass path with image file', () => {
      expect(r.Imagepath('file.jpg')).toMatchSnapshot()
      expect(r.Imagepath('file.jpeg')).toMatchSnapshot()
      expect(r.Imagepath('file.png')).toMatchSnapshot()
      expect(r.Imagepath('file.gif')).toMatchSnapshot()
      expect(r.Imagepath('file.svg')).toMatchSnapshot()
    })
    it('should error on everything except path with image file', () => {
      expect(() => r.Imagepath(true)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath('http://test.com/imagelikepath.svg/')).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath('http://test.com')).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath('/url')).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath('url/')).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath('url')).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath(-1)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath(1)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath(-1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath(1.555)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath(0)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath(null)).toThrowErrorMatchingSnapshot()
      expect(() => r.Imagepath(undefined)).toThrowErrorMatchingSnapshot()
    })
  })

  describe('Maxlength', () => {
    it('should pass string with less or equal length', () => {
      expect(r.Maxlength(3)(t.String)('12')).toMatchSnapshot()
      expect(r.Maxlength(3)(t.String)('123')).toMatchSnapshot()
    })
    it('should pass array with less or equal length', () => {
      expect(r.Maxlength(3)(t.list(t.Any))([1, 2])).toMatchSnapshot()
      expect(r.Maxlength(3)(t.list(t.Any))([1, 2, 3])).toMatchSnapshot()
    })
    it('should error on not tcomb type', () => {
      expect(() => r.Maxlength(3)('nope')('12345678')).toThrowErrorMatchingSnapshot()
    })
    it('should error on not `number` max', () => {
      expect(() => r.Maxlength('nope')(t.String)('12345678')).toThrowErrorMatchingSnapshot()
    })
    it('should error on long strings', () => {
      expect(() => r.Maxlength(3)(t.String)('1234')).toThrowErrorMatchingSnapshot()
    })
    it('should error on long arrays', () => {
      expect(() => r.Maxlength(3)(t.list(t.Any))([1, 2, 3, 4])).toThrowErrorMatchingSnapshot()
    })
  })
})
