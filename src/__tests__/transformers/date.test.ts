import { ok, error, ValidationError } from 'transform-ts'
import { $dateString, $unixtime, InvalidDateStringError, InvalidUnixtimeError } from '../..'

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

describe('dateString', () => {
  it('transform to Date object', () => {
    expect($dateString.transform('2020-09-16T17:34:02.980Z')).toEqual(ok(new Date('2020-09-16T17:34:02.980Z')))
  })

  it('failed to transform', () => {
    expect($dateString.transform('hogehoge')).toEqual(
      error(ValidationError.from(new InvalidDateStringError('hogehoge'))),
    )
  })
})
