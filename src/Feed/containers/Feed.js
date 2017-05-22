import React, { Component } from 'react';
import glamorous from 'glamorous';
import Spinner from 'react-spinkit';
import InfiniteLoadingStream from './InfiniteLoadingStream';

const { Div, Ul, H2 } = glamorous;

const containerStyle = {
  width: '400px',
  border: '2px solid whitesmoke',
  marginBottom: '30px'
};

const listStyle = {
  listStyleType: 'none'
};

const itemsContainerStyle = {
  height: '500px',
  overflow: 'auto',

  padding: '20px'
};

const headerStyle = {
  borderBottom: '1px solid whitesmoke',
  padding: '20px'
};

const centerAlignLoader = {
  width: '30px',
  margin: 'auto'
};

export default class Feed extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFeed();
  }

  componentWillReceiveProps(nextProps) {
    // if the data source for the feed
    // has changed, we need to refetch it
    if (this.props.api !== nextProps.api) {
      this.props.fetchFeed();
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
      fetchFeed
    } = this.props;

    var loadNextPage = function() {
      fetchFeed('below');
    };

    return (
      <Div {...containerStyle}>
        <H2 {...headerStyle}> {headerIcon()} {name} </H2>
        <Div {...itemsContainerStyle}>
          {isFetching
            ? <Div {...centerAlignLoader}>
                <Spinner spinnerName="pulse" />
              </Div>
            : items.length > 0
                ? <InfiniteLoadingStream
                    {...this.props}
                    loadNextPage={loadNextPage}
                  />
                : <span> No items </span>}
        </Div>

      </Div>
    );
  }
}
