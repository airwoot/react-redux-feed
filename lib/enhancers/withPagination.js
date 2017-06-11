import { withProps } from 'recompose'

export default function withOtherComponentStates(updateEndpoint, hasMoreItems) {
  return withProps({
    updateEndpoint,
    hasMoreItems
  })
}
