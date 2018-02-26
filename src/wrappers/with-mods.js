import React, { PureComponent } from 'react'

import { block, noop } from '../utils'


function getDefaultProps(BaseComponent, mods) {
  return mods.reduce((acc, mod) => {
    const { defaultProps } = mod(noop)

    return {
      ...acc,
      ...defaultProps,
    }
  }, BaseComponent.defaultProps)
}

function getBemComponent(BaseComponent, modsComponents, defaultMods) {
  return class BemComponent extends block(BaseComponent).withMods(...modsComponents) {
    constructor(props, context) {
      super(props, context)
      this.__defaultMods = defaultMods
    }
  }
}

function getMatchedMods(mods, props) {
  const matchedMods = {
    components: [],
    list: {},
  }

  if (mods.lenghth === 0) {
    return null
  }

  for (const mod of mods) {
    const { matcher } = mod(noop)

    if (matcher === undefined) {
      throw new Error(`Predicate for mod ${mod.name} not exists.`)
    }

    for (const key in props) {
      if (props[key] === matcher[key]) {
        matchedMods.components.push(mod)
        matchedMods.list = {
          ...matchedMods.list,
          [key]: props[key],
        }
      }
    }
  }

  return matchedMods
}

export function withMods(BaseComponent, ...mods) {
  return class BemEnhancedComponent extends PureComponent {
    constructor(props, context) {
      super(props, context)
      this.__createBemComponent(props)
    }

    componentWillReceiveProps(props) {
      this.__createBemComponent(props)
    }

    /**
     * @internal
     */
    __createBemComponent(props) {
      const { components, list } = getMatchedMods(mods, props)
      const defaultProps = getDefaultProps(BaseComponent, components)
      const BemComponent = getBemComponent(BaseComponent, components, list)

      this.component = (
        <BemComponent
          {...defaultProps}
          {...props}
        />
      )
    }

    render() {
      return this.component
    }
  }
}
