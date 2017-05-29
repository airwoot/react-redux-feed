import React, { Component, isValidElement } from 'react'
import glamorous from 'glamorous'
import InfiniteLoadingStream from './InfiniteLoadingStream'

const { Div, Ul } = glamorous

const containerStyle = {
  width: '400px',
  border: '2px solid whitesmoke',
  marginBottom: '30px'
}

const listStyle = {
  listStyleType: 'none'
}

const itemsContainerStyle = {
  height: '500px',
  overflow: 'auto',

  padding: '20px'
}

const centerAlignLoader = {
  width: '30px',
  margin: 'auto'
}

export default class Feed extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchFeed()
  }

  componentWillReceiveProps(nextProps) {
    // if the data source for the feed
    // has changed, we need to refetch it
    if (this.props.api !== nextProps.api) {
      this.props.fetchFeed()
    }
  }

  render() {
    var {
      items,
      itemComponent,
      itemIdKey,
      name,
      isFetching,
      hasMoreItems,
      headerIcon,
      headerComponent,
      fetchFeed
    } = this.props

    var loadNextPage = function() {
      fetchFeed('below')
    }

    return (
      <Div {...containerStyle}>
        <Div {...itemsContainerStyle}>
          {headerComponent ? headerComponent() : null}
          <InfiniteLoadingStream {...this.props} loadNextPage={loadNextPage} />
        </Div>
      </Div>
    )
  }
}
