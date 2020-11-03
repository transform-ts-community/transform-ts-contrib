import { ok, Transformer } from 'transform-ts'
type ReversedDict<Dic extends {[key: string]: string}> = {[A in Dic[keyof Dic]]: {[B in keyof Dic]: Dic[B] extends A ? B : never}[keyof Dic]}
type ShouldUseAsConst = never // TODO: なんかエラーメッセージに出てきて欲しい
type Remapped<
  Dic extends {[key: string]: string},
  Input extends {[key in keyof Dic]: any}
> = string extends Dic[keyof Dic] ? ShouldUseAsConst : {[key in keyof ReversedDict<Dic>]: Input[ReversedDict<Dic>[key]]}

export function $keyRemap<
  Dic extends {[key: string]: string},
  Input extends {[key in keyof Dic]: any}
>(map: string extends Dic[keyof Dic] ? ShouldUseAsConst : Dic): Transformer<Input, Remapped<Dic, Input>> {
  return Transformer.from(input => {
    var result: Remapped<Dic, Input> = {} as any // :P
    for (const [from, to] of Object.entries(map)) {
      result[to as Dic[keyof Dic]] = input[from]
    }
    return ok(result)
  })
}
