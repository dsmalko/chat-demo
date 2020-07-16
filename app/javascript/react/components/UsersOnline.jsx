import React from 'react'
import { connect } from 'react-redux'

class UsersOnline extends React.Component {
  render() {
    return (
      <div>
        <h2>People</h2>

        {this.props.users.online.map((user, idx) => {
          return (
            <div className="user" key={idx}>
              {user.nickname}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps, {})(UsersOnline)
