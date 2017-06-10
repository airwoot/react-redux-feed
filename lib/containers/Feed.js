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
  height: '600px',
  overflow: 'hidden',
  padding: '10px'
}

const centerAlignLoader = {
  width: '30px',
  margin: 'auto'
}

export default class Feed extends Component {
  componentDidMount() {
    this.props.fetchFeed()
  }

  componentWillReceiveProps(nextProps) {
    // if the data source for the feed
    // has changed, we need to refetch it
    if (this.props.getInitialEndpoint() !== nextProps.getInitialEndpoint()) {
      this.props.fetchFeed()
    }
  }

  render() {
    var { headerComponent } = this.props

    return (
      <Div {...containerStyle}>
        <Div {...itemsContainerStyle}>
          {headerComponent()}
          <InfiniteLoadingStream {...this.props} />
        </Div>
      </Div>
    )
  }
}
