let counter = 0

export function uuid(prefix = 'uniq') {
  return `${prefix}-${counter++}`
}
