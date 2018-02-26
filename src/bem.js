import { isNil, omit, merge } from 'ramda'

import { BemComponent } from './component'


// TODO: Change to dump component
export class Bem extends BemComponent {
  constructor(props) {
    super(props)
    this.block = props.block

    if (!isNil(props.tag)) {
      this.tag = props.tag
    }
  }

  attrs() {
    // Return attrs without omit keys
    return omit([
      'tag',
      'block',
      'attrs',
    ], merge(this.props.attrs, this.props))
  }
}
