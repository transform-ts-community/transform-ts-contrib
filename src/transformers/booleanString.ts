import { ok, Transformer } from 'transform-ts'

export const $booleanString = Transformer.from<'true' | 'false', boolean>(text => ok(text === 'true'))
