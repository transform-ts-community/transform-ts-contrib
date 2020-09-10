import { error, ok, Transformer, ValidationError } from 'transform-ts'

export class IsNotNumericStringError extends Error {
  constructor(readonly text: string) {
    super(`string "${text}" is not a numeric string.`)
    this.name = 'IsNotNumericStringError'
  }
}

export const $numericString = Transformer.from<string, number>(text =>
  Number.isNaN(Number(text)) ? error(ValidationError.from(new IsNotNumericStringError(text))) : ok(Number(text)),
)
