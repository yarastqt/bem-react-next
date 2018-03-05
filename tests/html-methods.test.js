import * as React from 'react'
import { shallow } from 'enzyme'
import { Bem } from 'bem-react-next'

import { ABlock } from './components/a-block/a-block'
import { BBlock } from './components/b-block/b-block'
import { CBlock } from './components/c-block/c-block'


describe('Entity without declaration', () => {
  it('Should have <div> by default', () => {
    const wrapper = shallow((
      <Bem block="block" />
    ))

    expect(wrapper.type()).toBe('div')
  })

  it('Should have declared tag', () => {
    const wrapper = shallow((
      <Bem block="block" tag="b" />
    ))

    expect(wrapper.type()).toBe('b')
  })

  it('Should proper inline attrs', () => {
    const wrapper = shallow((
      <Bem block="block" id="unique" />
    ))

    expect(wrapper.prop('id')).toBe('unique')
  })

  it('Should merge inline attrs and attrs mode', () => {
    const attrs = { action: '/' }
    const wrapper = shallow((
      <Bem block="block" id="unique" attrs={attrs} />
    ))

    expect(wrapper.props()).toMatchObject({
      ...attrs,
      id: 'unique',
    })
  })

  it('Should have props priority', () => {
    const attrs = { id: 'override' }
    const wrapper = shallow((
      <Bem block="block" id="unique" attrs={attrs} />
    ))

    expect(wrapper.props()).toMatchObject({
      id: 'unique',
    })
  })

  it('Should render aria', () => {
    const attrs = { 'aria-labelledby': 'address' }
    const wrapper = shallow((
      <Bem block="block" id="unique" attrs={attrs} />
    ))

    expect(wrapper.prop('aria-labelledby')).toBe(attrs['aria-labelledby'])
  })
})

describe('Entity with declaration', () => {
  it('Should be a <div> by default', () => {
    const wrapper = shallow((
      <ABlock />
    ))

    expect(wrapper.type()).toBe('div')
  })

  it('Should have declared tag', () => {
    const wrapper = shallow((
      <BBlock />
    ))

    expect(wrapper.type()).toBe('a')
  })

  it('Should have declared attrs', () => {
    const wrapper = shallow((
      <ABlock ariaLabelledBy="address" id="unique" />
    ))

    expect(wrapper.props()).toMatchObject({
      id: 'unique',
      name: 'name',
      'aria-labelledby': 'address',
    })
  })

  it('Should have declared style', () => {
    const wrapper = shallow((
      <CBlock />
    ))

    expect(wrapper.prop('style')).toMatchObject({
      font: 'bold',
      color: 'red',
      background: 'blue',
    })
  })
})
