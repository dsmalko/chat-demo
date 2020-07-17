import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Channels extends React.Component {
  render() {
    return (
      <div>
        <h2>Channels</h2>

        {this.props.channels.map((channel, idx) => {
          return (
            <Link
              to={'/channel/' + channel}
              key={idx}
              className={"channel " + (channel == this.props.currentChannel ? 'selected' : '')}
              replace
              >
              # {channel}
            </Link>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  channels: state.channels.all,
  currentChannel: state.channels.current
})

export default connect(mapStateToProps, {})(Channels)
