import { BemComponent } from 'bem-react-next'


export class ABlock extends BemComponent {
  constructor(props) {
    super(props)
    this.block = 'ABlock'
    this.state = {
      name: 'name',
    }
  }

  attrs() {
    const { ariaLabelledBy, id } = this.props
    const { name } = this.state

    return {
      id,
      name,
      'aria-labelledby': ariaLabelledBy,
    }
  }
}
