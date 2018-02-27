import { Component, createElement } from 'react'
import { string, node } from 'prop-types'
import { isNil } from 'ramda'

import { buildClassName } from './utils/class-name-builder'
import { uuid } from './utils/uuid'


export class BemComponent extends Component {
  static childContextTypes = {
    block: string.isRequired,
  }

  static propTypes = {
    children: node,
  }

  static defaultProps = {
    children: null,
  }

  constructor(props, context) {
    super(props, context)
    this.tag = 'div'
    this.block = null
    this.uuid = uuid()
    // Internals properties
    this.__defaultMods = {}
  }

  getChildContext() {
    return {
      block: this.block || '',
    }
  }

  /**
   * Return content as react children
   * @returns {object}
   */
  content() {
    const { children } = this.props

    return children
  }

  /**
   * Return BEM mods
   *
   * @param {object} props
   * @param {object} state
   * @returns {object}
   */
  mods() {
    return {}
  }

  /**
   * Return DOM node attributes
   *
   * @param {object} props
   * @param {object} state
   * @returns {object}
   */
  attrs() {
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

  render() {
    const children = this.content(this.props, this.state)
    const attrs = this.attrs(this.props, this.state)
    const className = buildClassName({
      block: this.__getBlock(),
      elem: this.elem,
      mods: {
        ...this.__defaultMods,
        ...this.mods(this.props, this.state),
      },
    })

    return createElement(this.tag, {
      ...attrs,
      children,
      className,
    })
  }
}
