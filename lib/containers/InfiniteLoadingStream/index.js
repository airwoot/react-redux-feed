import React, { Component, isValidElement } from 'react'
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized'
import StopIcon from 'react-icons/lib/fa/circle'

const centerAlignLoader = {
  width: '30px',
  margin: 'auto'
}

class InfiniteLoadingStream extends Component {
  render() {
    const {
      items,
      itemHeight,
      moreItems,
      isFetching,
      error,
      itemComponent,
      loaderComponent,
      errorComponent,
      noItemsComponent,
      fetchFeed
    } = this.props

    // If there are more items to be loaded then add
    // an extra row to hold a loading indicator or
    // the show an item to say that there is no more
    // items to load
    var rowCount = items.length + 1

    var loadNextPage = function() {
      if (moreItems) {
        fetchFeed('below')
      }
    }

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us
    // to load more than once.
    var loadMoreRows = isFetching || !moreItems ? () => {} : loadNextPage

    // Every row is loaded except for our loading indicator row.
    var isRowLoaded = index => {
      return !!items[index]
    }

    // Render a list item or a loading indicator.
    var rowRenderer = ({ index, key, style }) => {
      var content
      var loaderContent = <div>{loaderComponent()}</div>

      var errorContent = (
        <div style={{ textAlign: 'center' }}>{errorComponent()}</div>
      )

      var noItemContent = (
        <div style={{ textAlign: 'center' }}>{noItemsComponent()}</div>
      )

      if (isRowLoaded(index)) {
        content = itemComponent(items[index])
      } else {
        if (isFetching) {
          content = loaderContent
        } else {
          if (error && error.length > 0) {
            content = errorContent
          } else {
            content = noItemContent
          }
        }
      }

      return (
        <div key={key} style={style}>
          {content}
        </div>
      )
    }

    return (
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={rowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ height, width }) => (
              <div>
                <List
                  width={width}
                  height={height}
                  ref={registerChild}
                  rowCount={rowCount}
                  rowHeight={itemHeight}
                  onRowsRendered={onRowsRendered}
                  rowRenderer={rowRenderer}
                />
              </div>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    )
  }
}

export default InfiniteLoadingStream
