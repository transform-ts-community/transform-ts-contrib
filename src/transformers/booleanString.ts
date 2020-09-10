import { ok, Transformer, error, ValidationError } from 'transform-ts'

export class IsNotBooleanStringError extends Error {
  constructor(readonly text: string) {
    super(`string "${text}" is not a boolean string.`)
    this.name = 'IsNotBooleanStringError'
  }
}

export const $booleanString = Transformer.from<string, boolean>(text => {
  if (text === 'true') return ok(true)
  else if (text === 'false') return ok(false)
  else return error(ValidationError.from(new IsNotBooleanStringError(text)))
})
