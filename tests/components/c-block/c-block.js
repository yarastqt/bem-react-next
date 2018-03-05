import { BemComponent } from 'bem-react-next'


export class CBlock extends BemComponent {
  constructor(props) {
    super(props)
    this.block = 'CBlock'
  }

  attrs() {
    return {
      style: {
        font: 'bold',
        color: 'green',
      },
    }
  }

  styles() {
    return {
      color: 'red',
      background: 'blue',
    }
  }
}
