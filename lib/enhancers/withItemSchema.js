import { withProps } from 'recompose'

export default function withItemSchema(schema, config) {
  if (typeof config === 'object') {
    var { convertKeysToCamelcase } = config
  }
  return withProps({
    itemSchema: schema,
    convertKeysToCamelcase
  })
}
