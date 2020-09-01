import { error, ok, Transformer, ValidationError } from 'transform-ts'

export class InvalidUnixtimeError extends Error {
  constructor(readonly time: number) {
    super(`"${time}" is invalid unixtime.`)
    this.name = 'InvalidUnixtimeError'
  }
}

export const $unixtime = Transformer.from<number, Date>(time => {
  const date = new Date(time * 1000)
  return isNaN(date.getTime()) ? error(ValidationError.from(new InvalidUnixtimeError(time))) : ok(date)
})
