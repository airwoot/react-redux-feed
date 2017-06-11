import React, { Component, isValidElement } from 'react'
import glamorous from 'glamorous'
import isUrl from 'is-url-superb'
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
  overflow: 'hidden',
  height: '500px',
  padding: '10px'
}

export default class Feed extends Component {
  componentDidMount() {
    if (isUrl(this.props.api)) {
      this.props.fetchFeed()
    }
  }

  componentWillReceiveProps(nextProps) {
    // if the data source for the feed
    // has changed, we need to refetch it
    if (this.props.api !== nextProps.api && isUrl(nextProps.api)) {
      this.props.fetchFeed()
    }
  }

  render() {
    var {
      headerComponent,
      configErrorComponent,
      deactivatedComponent,
      api,
      configError
    } = this.props
    var content

    if (configError) {
      content = configErrorComponent()
    } else if (!isUrl(api)) {
      content = deactivatedComponent()
    } else {
      content = <InfiniteLoadingStream {...this.props} />
    }

    return (
      <Div {...containerStyle}>
        {headerComponent()}
        <Div {...itemsContainerStyle}>
          {content}
        </Div>
      </Div>
    )
  }
}
