import { ok, error, ValidationError } from 'transform-ts'
import { $booleanString, IsNotBooleanStringError } from '../..'

describe('booleanString', () => {
  it('transform to true', () => {
    expect($booleanString.transform('true')).toEqual(ok(true))
  })

  it('transform to false', () => {
    expect($booleanString.transform('false')).toEqual(ok(false))
  })

  it('failed to transform', () => {
    expect($booleanString.transform('hoge')).toEqual(error(ValidationError.from(new IsNotBooleanStringError('hoge'))))
  })
})
