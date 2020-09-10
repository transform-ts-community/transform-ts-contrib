import { ok, error, ValidationError } from 'transform-ts'
import { $regexp, IsNotMatchPatternError } from '../..'

describe('regexp', () => {
  it('validate successful', () => {
    expect($regexp(/^\w+$/).transform('hoge')).toEqual(ok('hoge'))
  })

  it('failed to validate', () => {
    expect($regexp(/^\w+$/).transform(' hoge.')).toEqual(
      error(ValidationError.from(new IsNotMatchPatternError(/^\w+$/, ' hoge.'))),
    )
  })
})
