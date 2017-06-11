import React, { Component } from 'react'
import { Feed } from '../../../../lib'
import { Div } from 'glamorous'
import Gist from '../../components/Gist'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 1',
  margin: '30px'
}

var user = 'hoodwink73'

var getInitialEndpoint = () => `https://api.github.com/users/${user}/gists`

export default class SimpleFeed extends Component {
  render() {
    var topic = 'reactjs'
    return (
      <Div {...feedsContainerStyle}>
        <Feed
          name={`${user}Gists`}
          getInitialEndpoint={getInitialEndpoint}
          itemComponent={Gist}
        />
      </Div>
    )
  }
}
