import { ok, error, ValidationError } from 'transform-ts'
import { $unixtime, InvalidUnixtimeError } from '../..'

describe('unixtime', () => {
  it('transform to Date object', () => {
    expect($unixtime.transform(1599731849.634)).toEqual(ok(new Date('2020-09-10T09:57:29.634Z')))
  })

  it('failed to transform', () => {
    expect($unixtime.transform(-62167219200001)).toEqual(
      error(ValidationError.from(new InvalidUnixtimeError(-62167219200001))),
    )
  })
})
