import $, { ok } from 'transform-ts'
import { $keyRemap } from '../../transformers/keyRemap'

describe('keyRemap', () => {
  it('transform', () => {
    const input = {
      aaa: 1,
    } as const
    expect(
      $.obj({aaa: $.number})
        .compose($keyRemap({
          aaa: "bbb"
        } as const))
        .transform(input)
      ).toEqual(ok({bbb: 1}))
  })
})
