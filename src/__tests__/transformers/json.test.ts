import { error, ok, ValidationError } from 'transform-ts'
import { $toJSON } from '../..'
import { $json, InvalidJSONError } from '../../transformers/json'

describe('to JSON', () => {
  it('transform successful', () => {
    expect($toJSON.transform({ hoge: 'piyo' })).toEqual(ok('{"hoge":"piyo"}'))
  })
})

describe('is JSON', () => {
  it('validate successful', () => {
    expect($json.transform('{"hoge":"piyo"}')).toEqual(ok('{"hoge":"piyo"}'))
  })

  it('failed to validate', () => {
    expect($json.transform('hoge')).toEqual(error(ValidationError.from(new InvalidJSONError('hoge'))))
  })
})
