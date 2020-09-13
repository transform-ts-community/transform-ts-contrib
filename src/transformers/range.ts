import { error, Transformer, ValidationError } from 'transform-ts'

export class UndefinedRangeError extends Error {
  constructor() {
    super(`min and max is undefined.`)
    this.name = 'UndefinedRangeError'
  }
}

export class InvalidRangeError extends Error {
  constructor(readonly min: number, readonly max: number) {
    super(`min "${min}" must be equal to or less than max "${max}"`)
    this.name = 'InvalidRangeError'
  }
}

export class OufOfMinError extends Error {
  constructor(readonly length: number, readonly range: number) {
    super(`length "${length}" must be equal to or greater than min "${range}"`)
    this.name = 'OufOfMinError'
  }
}

export class OufOfMaxError extends Error {
  constructor(readonly length: number, readonly range: number) {
    super(`length "${length}" must be equal to or less than min "${range}"`)
    this.name = 'OufOfMaxError'
  }
}

export function $range<A>(
  f: Transformer<number | string | Array<any>, A>,
  { min, max }: { min?: number; max?: number },
): Transformer<number | string | Array<any>, A> {
  return Transformer.from<number | string | Array<any>, A>(u => {
    if (!min && !max) return error(ValidationError.from(new UndefinedRangeError()))
    if (min && max && max < min) return error(ValidationError.from(new InvalidRangeError(min, max)))

    let length: number

    if (Array.isArray(u) || typeof u === 'string') length = u.length
    else length = u

    if (min && length < min) return error(ValidationError.from(new OufOfMinError(length, min)))
    if (max && max < length) return error(ValidationError.from(new OufOfMaxError(length, max)))

    return f.transform(u)
  })
}
