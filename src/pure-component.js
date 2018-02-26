import { BemComponent } from './component'


function ComponentDummy() {}
ComponentDummy.prototype = BemComponent.prototype

/**
 * Convenience component with default shallow equality check for sCU.
 */
export function BemPureComponent(props, context, updater) {
  this.props = props
  this.context = context
  this.refs = {} // Original - emptyObject.
  this.updater = updater || {} // Original - ReactNoopUpdateQueue.
}

// eslint-disable-next-line no-multi-assign
const bemPureComponentPrototype = (BemPureComponent.prototype = new ComponentDummy())
// eslint-disable-next-line padding-line-between-statements
bemPureComponentPrototype.constructor = BemPureComponent
// Avoid an extra prototype jump for these methods.
Object.assign(bemPureComponentPrototype, BemComponent.prototype)
bemPureComponentPrototype.isPureReactComponent = true
