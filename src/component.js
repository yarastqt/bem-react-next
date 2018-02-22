import React, { Component, createElement } from 'react'
import { string } from 'prop-types'
import { stringify } from '@bem/sdk.naming.entity'
import { isNil, trim } from 'ramda'


export class BemComponent extends Component {
  static childContextTypes = {
    block: string.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.tag = 'div'
    this.block = null
  }

  getChildContext() {
    return {
      block: this.block || '',
    }
  }

  render() {
    const children = this.content(this.props, this.state)
    const attrs = this.attrs(this.props, this.state)
    const className = this.__buildClassName({
      block: this.__getBlock(),
      elem: this.elem,
      mods: this.mods(this.props, this.state),
    })

    return createElement(this.tag, {
      ...attrs,
      children,
      className,
    })
  }

  /**
   * Return content as react children
   *
   * @param {object} props
   * @param {object} state
   * @returns {object}
   */
  content({children}) {
    return children
  }

  /**
   * Return BEM mods
   *
   * @param {object} props
   * @param {object} state
   * @returns {object}
   */
  mods(props, state) {
    return {}
  }

  /**
   * Return DOM node attributes
   *
   * @param {object} props
   * @param {object} state
   * @returns {object}
   */
  attrs(props, state) {
    return {}
  }

  /**
   * @internal
   */
  __getBlock() {
    if (isNil(this.elem)) {
      if (isNil(this.block)) {
        throw new Error('Block property not exists.')
      }

      return this.block
    }

    if (isNil(this.block) && isNil(this.context.block)) {
      throw new Error('Block property not exists.')
    }

    return this.block || this.context.block
  }

  /**
   * @internal
   */
  __buildClassName({ block, elem, mods }) {
    const baseClassName = stringify({ block, elem: elem || undefined })
    const modsClassName = Object
      .keys(mods)
      .map((name) => {
        const value = mods[name]

        if (value !== false && value !== undefined) {
          return stringify({
            block,
            mod: { name, val: value },
          })
        }
      })
      .filter(Boolean)
      .join(' ')

    return trim(`${baseClassName} ${modsClassName}`)
  }
}
