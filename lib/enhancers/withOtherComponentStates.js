import { withProps } from 'recompose'

export default function withOtherComponentStates({
  noItems,
  loader,
  error,
  deactivated
}) {
  return withProps({
    noItemsComponent: noItems,
    loaderComponent: loader,
    errorComponent: error,
    deactivatedComponent: deactivated
  })
}
