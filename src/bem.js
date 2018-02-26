import { createElement } from 'react'

import { buildClassName } from './utils/class-name-builder'


export function Bem({ tag = 'div', block, children, attrs, ...props }) {
  return createElement(tag, {
    ...attrs,
    children,
    className: buildClassName({
      block,
      mods: {},
    }),
    ...props,
  })
}
