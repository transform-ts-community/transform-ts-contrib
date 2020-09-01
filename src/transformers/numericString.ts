import { error, ok, Transformer, ValidationError } from 'transform-ts'

export class DoesNotNumericStringError extends Error {
  constructor(readonly text: string) {
    super(`string "${text}" does not numeric string.`)
    this.name = 'DoesNotNumericStringError'
  }
}

export const $numericString = Transformer.from<string, string>(text =>
  Number.isNaN(Number(text)) ? error(ValidationError.from(new DoesNotNumericStringError(text))) : ok(text),
)
