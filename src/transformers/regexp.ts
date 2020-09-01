import { error, ok, Transformer, ValidationError } from 'transform-ts'

export class DoesNotMatchPatternError extends Error {
  constructor(readonly pattern: RegExp, readonly text: string) {
    super(`string "${text}" does not match the pattern "${pattern.toString()}".`)
    this.name = 'DoesNotMatchPatternError'
  }
}

export function $regexp(regexp: RegExp): Transformer<string, string> {
  return Transformer.from<string, string>(text =>
    regexp.test(text) ? ok(text) : error(ValidationError.from(new DoesNotMatchPatternError(regexp, text))),
  )
}
