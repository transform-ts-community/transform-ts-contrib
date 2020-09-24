import $, { error, ok, ValidationError } from 'transform-ts'
import { $range, InvalidRangeError, OufOfMaxError, OufOfMinError } from '../..'

describe('invalid range', () => {
  it('throws InvalidRangeError', () => {
    expect(() => $.number.compose($range({ min: 2, max: 1 })).transform(1)).toThrow(new InvalidRangeError(2, 1))
  })
})

describe('Number', () => {
  it('throws OufOfMinError', () => {
    expect($.number.compose($range({ min: 1 })).transform(0)).toEqual(
      error(ValidationError.from(new OufOfMinError(0, 1))),
    )
  })

  it('success validation with equal to the min value', () => {
    expect($.number.compose($range({ min: 1 })).transform(1)).toEqual(ok(1))
  })

  it('success validation between the min and max values', () => {
    expect($.number.compose($range({ min: 1, max: 3 })).transform(2)).toEqual(ok(2))
  })

  it('success validation with equal to the max value', () => {
    expect($.number.compose($range({ max: 3 })).transform(3)).toEqual(ok(3))
  })

  it('throws OufOfMaxError', () => {
    expect($.number.compose($range({ max: 3 })).transform(4)).toEqual(
      error(ValidationError.from(new OufOfMaxError(4, 3))),
    )
  })
})

describe('String', () => {
  it('throws OufOfMinError', () => {
    expect($.string.compose($range({ min: 1 })).transform('')).toEqual(
      error(ValidationError.from(new OufOfMinError(0, 1))),
    )
  })

  it('success validation with equal to the min value', () => {
    expect($.string.compose($range({ min: 1 })).transform('a')).toEqual(ok('a'))
  })

  it('success validation between the min and max values', () => {
    expect($.string.compose($range({ min: 1, max: 3 })).transform('ab')).toEqual(ok('ab'))
  })

  it('success validation with equal to the max value', () => {
    expect($.string.compose($range({ max: 3 })).transform('abc')).toEqual(ok('abc'))
  })

  it('throws OufOfMaxError', () => {
    expect($.string.compose($range({ max: 3 })).transform('abcd')).toEqual(
      error(ValidationError.from(new OufOfMaxError(4, 3))),
    )
  })
})

describe('Array', () => {
  it('throws OufOfMinError', () => {
    expect($.array($.string).compose($range({ min: 1 })).transform([])).toEqual(
      error(ValidationError.from(new OufOfMinError(0, 1))),
    )
  })

  it('success validation with equal to the min value', () => {
    expect($.array($.string).compose($range({ min: 1 })).transform(['a'])).toEqual(ok(['a']))
  })

  it('success validation between the min and max values', () => {
    expect($.array($.string).compose($range({ min: 1, max: 3 })).transform(['a', 'b'])).toEqual(ok(['a', 'b']))
  })

  it('success validation with equal to the max value', () => {
    expect($.array($.string).compose($range({ max: 3 })).transform(['a', 'b', 'c'])).toEqual(ok(['a', 'b', 'c']))
  })

  it('throws OufOfMaxError', () => {
    expect($.array($.string).compose($range({ max: 3 })).transform(['a', 'b', 'c', 'd'])).toEqual(
      error(ValidationError.from(new OufOfMaxError(4, 3))),
    )
  })
})
