/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    // tell Jest to handle *.vue files
    'vue',
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  testEnvironment: 'jsdom',
  // fix the bug - ReferenceError: Vue is not defined
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
}
