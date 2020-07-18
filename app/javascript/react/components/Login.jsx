import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signInUser } from '../redux-token-auth-config'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: ''
      },
      errors: []
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({
      errors: []
    })

    this.props.signInUser(this.state.user)
      .then(() => {
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
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

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <h1>Login</h1>

            {this.state.errors.map((error, idx) => { 
              return (
                <div className="alert alert-danger" key={idx} role="alert">
                  {error}
                </div>
              )
            })}

            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="user_email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="user_email"
                  value={this.state.user.email}
                  onChange={this.handleInputChange.bind(this)}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="user_password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="user_password"
                  value={this.state.user.password}
                  onChange={this.handleInputChange.bind(this)}
                  />
              </div>
              <button type="submit" className="btn btn-success">Log in</button>
              <Link to="/signup" tag="button" className="btn btn-link">Signup</Link>
              <hr/>
              <div className="mt-2 small">
                React version | <a href="/?framework=vue">Switch to Vue version</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { signInUser })(Login)
