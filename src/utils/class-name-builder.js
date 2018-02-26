import { stringify } from '@bem/sdk.naming.entity'
import { trim } from 'ramda'


export function buildClassName({ block, elem, mods }) {
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

      return false
    })
    .filter(Boolean)
    .join(' ')

  return trim(`${baseClassName} ${modsClassName}`)
}
