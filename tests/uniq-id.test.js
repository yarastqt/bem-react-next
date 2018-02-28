import * as React from 'react'
import { shallow } from 'enzyme'

import { BBlock } from './components/b-block/b-block'


test('Should generate id', () => {
  const wrapper = shallow((
    <BBlock />
  ))

  expect(wrapper.prop('id')).toMatch(/uniq-\d+$/)
})
