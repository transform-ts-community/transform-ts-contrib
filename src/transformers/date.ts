import { error, ok, Transformer, ValidationError } from 'transform-ts'

export class InvalidUnixtimeError extends Error {
  constructor(readonly time: number) {
    super(`"${time}" is invalid unixtime.`)
    this.name = 'InvalidUnixtimeError'
  }
}

/**
 * Convert unixtime string to Date object
 *
 * @param time Converted as seconds instead of milliseconds
 */
export const $unixtime = Transformer.from<number, Date>(time => {
  const date = new Date(time * 1000)
  return isNaN(date.getTime()) ? error(ValidationError.from(new InvalidUnixtimeError(time))) : ok(date)
})

export class InvalidDateStringError extends Error {
  constructor(readonly date: string) {
    super(`"${date}" is invalid unixtime.`)
    this.name = 'InvalidDateStringError'
  }
}

/**
 * Convert string to Date object
 *
 * @param text Strongly recommend to use ISO 8601 format
 */
export const $dateString = Transformer.from<string, Date>(text => {
  const date = new Date(text)
  return isNaN(date.getTime()) ? error(ValidationError.from(new InvalidDateStringError(text))) : ok(date)
})
