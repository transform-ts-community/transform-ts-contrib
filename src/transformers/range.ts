import { error, Transformer, ValidationError } from 'transform-ts'

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

export function $range<A extends { length: number } | number, B>(
  { min, max }: { min: number; max?: number } | { min?: number; max: number },
  f: Transformer<A, B>,
): Transformer<A, B> {
  if (min !== undefined && max !== undefined && max < min)
    throw new InvalidRangeError(min, max)

  return Transformer.from<A, B>(u => {
    let length: number

    const c: { length: number } | number = u
    if (typeof c === 'number') length = c
    else length = c.length

    if (min && length < min) return error(ValidationError.from(new OufOfMinError(length, min)))
    if (max && max < length) return error(ValidationError.from(new OufOfMaxError(length, max)))

    return f.transform(u)
  })
}
