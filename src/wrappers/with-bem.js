import React, { PureComponent } from 'react'

import { block, noop } from '../utils'


export function withBEM(BaseComponent, ...mods) {
  return class BemEnhancedComponent extends PureComponent {
    constructor(props, context) {
      super(props, context)
      this.__createBemComponent(mods, props)
    }

    componentWillReceiveProps(props) {
      this.__createBemComponent(mods, props)
    }

    render() {
      return this.component
    }

    /**
     * @internal
     */
    __createBemComponent(mods, props) {
      const matchedMods = this.__getMatchedMods(mods, props)
      const defaultProps = this.__getDefaultProps(BaseComponent, matchedMods)
      const BemComponent = this.__getBemComponent(BaseComponent, matchedMods)

      this.component = (
        <BemComponent
          {...defaultProps}
          {...props}
        />
      )
    }

    /**
     * @internal
     */
    __getMatchedMods(mods, props) {
      const matchedMods = []

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
            matchedMods.push(mod)
          }
        }
      }

      return matchedMods
    }

    /**
     * @internal
     */
    __getDefaultProps(BaseComponent, mods) {
      return mods.reduce((acc, mod) => {
        const { defaultProps } = mod(noop)

        return {
          ...acc,
          ...defaultProps,
        }
      }, BaseComponent.defaultProps)
    }

    /**
     * @internal
     */
    __getBemComponent(BaseComponent, mods) {
      return class BemComponent extends block(BaseComponent).withMods(...mods) {}
    }
  }
}