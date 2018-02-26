import { BemComponent } from 'bem-react-next'


export class BBlock extends BemComponent {
  constructor(props) {
    super(props)
    this.block = 'BBlock'
    this.tag = 'a'
  }

  content({ children }) {
    return ['content', children]
  }
}
