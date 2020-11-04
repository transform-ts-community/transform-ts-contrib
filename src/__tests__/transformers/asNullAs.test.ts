import { ok } from 'transform-ts'
import { $emptyAsNull, $zeroAsNull, $nullAsEmpty, $nullAsZero } from '../..'

describe('empty as null', () => {
  it('transform to null when empty', () => {
    expect($emptyAsNull.transform('')).toEqual(ok(null))
  })

  it('transform to string', () => {
    expect($emptyAsNull.transform('hoge')).toEqual(ok('hoge'))
  })
})

describe('zero as null', () => {
  it('transform to null when 0', () => {
    expect($zeroAsNull.transform(0)).toEqual(ok(null))
  })

  it('transform to number', () => {
    expect($zeroAsNull.transform(1)).toEqual(ok(1))
  })
})

describe('null as empty', () => {
  it('transform to empty when null', () => {
    expect($nullAsEmpty.transform(null)).toEqual(ok(''))
  })

  it('transform to string', () => {
    expect($nullAsEmpty.transform('hoge')).toEqual(ok('hoge'))
  })
})

describe('number', () => {
  it('transform to null when 0', () => {
    expect($nullAsZero.transform(null)).toEqual(ok(0))
  })

  it('transform to number', () => {
    expect($nullAsZero.transform(1)).toEqual(ok(1))
  })
})
