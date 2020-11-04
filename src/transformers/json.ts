import { error, ok, Transformer, ValidationError } from 'transform-ts'

export const $toJSON = Transformer.from<any, string>(value => ok(JSON.stringify(value)))

export class InvalidJSONError extends Error {
  constructor(readonly json: string) {
    super(`string "${json}" is invalid JSON.`)
    this.name = 'InvalidJSONError'
  }
}

export const $json = Transformer.from<string, string>(json => {
  try {
    JSON.parse(json)
  } catch (_) {
    return error(ValidationError.from(new InvalidJSONError(json)))
  }
  return ok(json)
})
