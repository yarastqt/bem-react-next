import { compose } from 'ramda'


class BlockBuilder {
  constructor(BaseComponent) {
    this.__BaseComponent = BaseComponent
  }

  mods(...mods) {
    if (mods.length === 0) {
      return this.__BaseComponent
    }

    return compose(...mods)(this.__BaseComponent)
  }
}

export function block(BaseComponent) {
  return new BlockBuilder(BaseComponent)
}

export function noop() {}

export function bool2string(value) {
  return value ? 'yes' : undefined
}

export function whenNot(value, result) {
  return value ? undefined : result
}
