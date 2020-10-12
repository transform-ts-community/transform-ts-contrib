import { ok, Transformer } from 'transform-ts'

export const $emptyAsNull = Transformer.from<string, string | null>(text => (text === '' ? ok(null) : ok(text)))

export const $zeroAsNull = Transformer.from<number, number | null>(numeric => (numeric === 0 ? ok(null) : ok(numeric)))

export const $nullAsEmpty = Transformer.from<string | null, string>(text => (text === null ? ok('') : ok(text)))

export const $nullAsZero = Transformer.from<number | null, number>(numeric => (numeric === null ? ok(0) : ok(numeric)))
