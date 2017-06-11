import { withProps } from 'recompose'

export default function withGetItems(extractor) {
  return withProps({
    getItems: extractor
  })
}
