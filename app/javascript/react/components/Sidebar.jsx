import React from 'react'
import Channels from './Channels'
import UsersOnline from './UsersOnline'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChannel: ''
    }
  }

  render() {
    return (
      <div className="sidebar">
        <Channels />
        <UsersOnline />
      </div>
    )
  }
}

export default (Sidebar)
