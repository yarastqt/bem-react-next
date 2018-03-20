import { Component, createElement } from 'react'
import { node } from 'prop-types'
import { isNil } from 'ramda'

import { buildClassName } from './utils/class-name-builder'
import { uuid } from './utils/uuid'


export class BemComponent extends Component {
  static propTypes = {
    children: node,
  }

  static defaultProps = {
    children: null,
  }

  constructor(props, context) {
    super(props, context)
    this.block = null
    this.uuid = uuid()
    this._defaultMods = {}
  }

  /**
   * Return HTML tag
   *
   * @param {object} props
   * @param {object} state
   * @returns {string}
   */
  tag() {
    return 'div'
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
   * Return DOM node styles
   *
   * @param {object} props
   * @param {object} state
   * @returns {object}
   */
  styles() {
    return {}
  }

  /**
   * @internal
   */
  __getBlock() {
    if (isNil(this.block)) {
      throw new Error('Block property not exists.')
    }

    return this.block
  }

  render() {
    const tag = this.tag(this.props, this.state)
    const children = this.content(this.props, this.state)
    const attrs = this.attrs(this.props, this.state)
    const styles = this.styles(this.props, this.state)
    const advancedAttrs = {
      ...attrs, style: {
        ...attrs.style,
        ...styles,
      },
    }
    const className = buildClassName({
      block: this.__getBlock(),
      elem: this.elem,
      mods: {
        ...this._defaultMods,
        ...this.mods(this.props, this.state),
      },
    })

    return createElement(tag, {
      ...advancedAttrs,
      children,
      className,
    })
  }
}
