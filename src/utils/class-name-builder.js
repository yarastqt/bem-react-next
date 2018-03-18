import { stringify } from '@bem/sdk.naming.entity'
import { trim } from 'ramda'


export function buildClassName({ block, elem, mods }) {
  const baseClassName = stringify({ block, elem })
  const modsClassName = Object
    .keys(mods)
    .map((name) => {
      const value = mods[name]

      if (value !== false && value !== undefined) {
        return stringify({
          block,
          elem,
          mod: { name, val: value },
        })
      }

      return false
    })
    .filter(Boolean)
    .join(' ')

  return trim(`${baseClassName} ${modsClassName}`)
}
