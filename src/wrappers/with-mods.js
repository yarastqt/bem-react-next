import React, { PureComponent } from 'react'

import { block, noop } from '../utils'


function getBemComponent(BaseComponent, modsComponents, defaultMods) {
  return class BemComponent extends block(BaseComponent).mods(...modsComponents) {
    constructor(props, context) {
      super(props, context)
      this._defaultMods = defaultMods
    }
  }
}

function getMatchedMods(mods, props) {
  const defaultMods = {}
  const matchedMods = new Set()

  if (mods.lenghth === 0) {
    return {
      defaultMods,
      matchedMods: [],
    }
  }

  for (const mod of mods) {
    const { predicate } = mod(noop)

    if (predicate === undefined) {
      throw new Error(`Predicate for mod ${mod.name} not exists.`)
    }

    for (const key in props) {
      if (
        props[key] === predicate[key]
        && props[key] !== undefined
        && predicate[key] !== undefined
      ) {
        matchedMods.add(mod)
        defaultMods[key] = props[key]
      }
    }
  }

  return {
    defaultMods,
    matchedMods: Array.from(matchedMods),
  }
}

export function withMods(BaseComponent, ...mods) {
  return class BemEnhancedComponent extends PureComponent {
    constructor(props, context) {
      super(props, context)
      const { defaultMods, matchedMods } = getMatchedMods(mods, props)

      this._createBemComponent(props, defaultMods, matchedMods)
    }

    componentWillReceiveProps(nextProps) {
      // Create new bem component if matched mods will be changed
      const { defaultMods, matchedMods } = getMatchedMods(mods, nextProps)
      const unchangedModsLength = this._prevMatchedMods.length === matchedMods.length
      const unchangedMods = this._prevMatchedMods.every((value) => (
        matchedMods.includes(value)
      ))

      if (!unchangedModsLength || !unchangedMods) {
        this._createBemComponent(nextProps, defaultMods, matchedMods)
      }
    }

    /**
     * Create BEM component
     * @private
     *
     * @param {Object} props
     * @param {Function[]} defaultMods
     * @param {Object} matchedMods
     */
    _createBemComponent(props, defaultMods, matchedMods) {
      this._prevMatchedMods = matchedMods
      this._BemComponent = getBemComponent(BaseComponent, matchedMods, defaultMods)
    }

    render() {
      const { props, _BemComponent: BemComponent } = this

      return (
        <BemComponent {...props} />
      )
    }
  }
}
