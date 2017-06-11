import { withProps } from 'recompose'

export default function withOtherComponentStates({ noItems, loader, error }) {
  return withProps({
    noItemsComponent: noItems,
    loaderComponent: loader,
    errorComponent: error
  })
}
