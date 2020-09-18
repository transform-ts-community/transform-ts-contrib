import $, { error, ok, ValidationError } from 'transform-ts'
import { $range, InvalidRangeError, OufOfMaxError, OufOfMinError } from '../..'

describe('invalid range', () => {
  it('throws InvalidRangeError', () => {
    expect(() => $range({ min: 2, max: 1 }, $.number).transform(1)).toThrow(new InvalidRangeError(2, 1))
  })
})

describe('Number', () => {
  it('throws OufOfMinError', () => {
    expect($range({ min: 1, max: 3 }, $.number).transform(0)).toEqual(
      error(ValidationError.from(new OufOfMinError(0, 1))),
    )
  })

  it('success validation with equal to the min value', () => {
    expect($range({ min: 1, max: 3 }, $.number).transform(1)).toEqual(ok(1))
  })

  it('success validation between the min and max values', () => {
    expect($range({ min: 1, max: 3 }, $.number).transform(2)).toEqual(ok(2))
  })

  it('success validation with equal to the max value', () => {
    expect($range({ min: 1, max: 3 }, $.number).transform(3)).toEqual(ok(3))
  })

  it('throws OufOfMaxError', () => {
    expect($range({ min: 1, max: 3 }, $.number).transform(4)).toEqual(
      error(ValidationError.from(new OufOfMaxError(4, 3))),
    )
  })
})

describe('String', () => {
  it('throws OufOfMinError', () => {
    expect($range({ min: 1, max: 3 }, $.string).transform('')).toEqual(
      error(ValidationError.from(new OufOfMinError(0, 1))),
    )
  })

  it('success validation with equal to the min value', () => {
    expect($range({ min: 1, max: 3 }, $.string).transform('a')).toEqual(ok('a'))
  })

  it('success validation between the min and max values', () => {
    expect($range({ min: 1, max: 3 }, $.string).transform('ab')).toEqual(ok('ab'))
  })

  it('success validation with equal to the max value', () => {
    expect($range({ min: 1, max: 3 }, $.string).transform('abc')).toEqual(ok('abc'))
  })

  it('throws OufOfMaxError', () => {
    expect($range({ min: 1, max: 3 }, $.string).transform('abcd')).toEqual(
      error(ValidationError.from(new OufOfMaxError(4, 3))),
    )
  })
})

describe('Array', () => {
  it('throws OufOfMinError', () => {
    expect($range({ min: 1, max: 3 }, $.array($.string)).transform([])).toEqual(
      error(ValidationError.from(new OufOfMinError(0, 1))),
    )
  })

  it('success validation with equal to the min value', () => {
    expect($range({ min: 1, max: 3 }, $.array($.string)).transform(['a'])).toEqual(ok(['a']))
  })

  it('success validation between the min and max values', () => {
    expect($range({ min: 1, max: 3 }, $.array($.string)).transform(['a', 'b'])).toEqual(ok(['a', 'b']))
  })

  it('success validation with equal to the max value', () => {
    expect($range({ min: 1, max: 3 }, $.array($.string)).transform(['a', 'b', 'c'])).toEqual(ok(['a', 'b', 'c']))
  })

  it('throws OufOfMaxError', () => {
    expect($range({ min: 1, max: 3 }, $.array($.string)).transform(['a', 'b', 'c', 'd'])).toEqual(
      error(ValidationError.from(new OufOfMaxError(4, 3))),
    )
  })
})
