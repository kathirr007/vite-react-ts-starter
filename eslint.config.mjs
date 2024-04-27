import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ["public","**/public/**","dist","**/dist/**","node_modules","**/node_modules/**"],
  formatters: true,
  react: true,
})
