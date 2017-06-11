import { withProps } from 'recompose'

export default function withHeaderComponent(headerComponent) {
  return withProps({
    headerComponent
  })
}
