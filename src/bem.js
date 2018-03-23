import { createElement } from 'react'
import { string, node, shape } from 'prop-types'

import { buildClassName } from './utils/class-name-builder'


export function Bem({ tag, block, elem, mods, children, attrs, ...props }) {
  return createElement(tag, {
    ...attrs,
    children,
    className: buildClassName({
      block,
      elem,
      mods,
    }),
    ...props,
  })
}

Bem.propTypes = {
  tag: string,
  block: string.isRequired,
  elem: string,
  mods: shape({}),
  children: node,
  attrs: shape({}),
}

Bem.defaultProps = {
  tag: 'div',
  elem: undefined,
  mods: {},
  children: null,
  attrs: {},
}
