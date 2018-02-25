import { BemComponent } from './component'


// TODO: Change to pure component
export class Bem extends BemComponent {
  constructor(props) {
    super(props)
    this.block = props.block
  }
}
