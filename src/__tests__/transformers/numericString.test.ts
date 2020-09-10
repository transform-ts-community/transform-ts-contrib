import { ok, error, ValidationError } from 'transform-ts'
import { $numericString, IsNotNumericStringError } from '../..'

describe('numericString', () => {
  it('transform to number', () => {
    expect($numericString.transform('123')).toEqual(ok(123))
  })

  it('failed to transform', () => {
    expect($numericString.transform('hoge')).toEqual(error(ValidationError.from(new IsNotNumericStringError('hoge'))))
  })
})
