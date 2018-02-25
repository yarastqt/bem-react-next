import * as React from 'react'
import { render } from 'enzyme'
import { Bem } from 'bem-react-next'

import { ABlock } from './components/a-block/a-block'
import { BBlock } from './components/b-block/b-block'


describe('Entity without declaration', () => {
  it('Entity should have passed content', () => {
    const text = 'content'
    const wrapper = render((
      <Bem block="block">{text}</Bem>
    ))

    expect(wrapper.text()).toBe(text)
  })
})

describe('Entity with declaration', () => {
  it('Entity should have passed content', () => {
    const text = 'content'
    const wrapper = render((
      <ABlock>{text}</ABlock>
    ))

    expect(wrapper.text()).toBe(text)
  })

  it('Entity should have declared content', () => {
    const text = 'extend'
    const wrapper = render((
      <BBlock>{text}</BBlock>
    ))

    expect(wrapper.text()).toBe(`content${text}`)
  })
})
