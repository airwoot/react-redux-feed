import { withProps } from 'recompose'

export default function withItemSchema(schema) {
  return withProps({
    itemSchema: schema
  })
}
