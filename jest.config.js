'use strict'

const path = require('path')


module.exports = {
  setupFiles: [
    path.resolve(__dirname, 'jest.setup.js'),
  ],
  moduleNameMapper: {
    'bem-react-next': '<rootDir>/src/index.js',
  },
}
