import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser, signInUser } from '../redux-token-auth-config'
import { updateProfile } from '../actions/profileActions'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: props.currentUser.attributes,
      errors: []
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({
      errors: []
    })
    
    this.props.updateProfile(this.state.user)
      .then(() => {
        this.props.history.push('/')
      })
      .catch(errors => {
        this.setState({
          errors: errors
        })
      })
  }

  handleInputChange(event) {
    const { name, value } = event.target

    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    })
  }

  handleAvatarFileChange() {
    const { files } = event.target

    this.setState({
      user: {
        ...this.state.user,
        avatarFile: files[0]
      }
    })
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <h1>Edit Your Profile</h1>

            {this.state.errors.map((error, idx) => { 
              return (
                <div className="alert alert-danger" key={idx} role="alert">
                  {error}
                </div>
              )
            })}

            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="user_nickname">Nickname</label>
                <input
                  type="nickname"
                  className="form-control"
                  name="nickname"
                  id="user_nickname"
                  autoComplete="off"
                  value={this.state.user.nickname}
                  onChange={this.handleInputChange.bind(this)}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="user_avatar">Avatar</label>

                <div className="profile-avatar">
                  <img src={this.state.user.avatar_medium_url} alt="My Avatar" />
                </div>
                <input type="file" className="form-control" id="user_avatar" onChange={this.handleAvatarFileChange.bind(this)} />
              </div>
              <button type="submit" className="btn btn-success">Save Changes</button>
              <Link to="/" tag="button" className="btn btn-link">Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser
})

export default connect(mapStateToProps, {
  updateProfile
})(Profile)
