import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchMessages, sendMessage, addMessage } from '../actions/messageActions'
import { setCurrentChannel } from '../actions/channelActions'
import { setUsersOnline } from '../actions/usersActions'
import { signOutUser } from '../redux-token-auth-config'
import { createConsumer } from 'cable'
import Sidebar from './Sidebar'
import GroupedMessages from './GroupedMessages'

class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newMessage: {
        text: '',
      },
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleSendMessage = this.handleSendMessage.bind(this)
    this.handleNewMessageChange = this.handleNewMessageChange.bind(this)
    this.isNewMessageValid = this.isNewMessageValid.bind(this)

    this.newMessageRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.currentUser.isSignedIn) {
      this.props.fetchMessages()
      this.subscribeChannels()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params } } = nextProps
    
    if (params.channelId) {
      this.props.setCurrentChannel(params.channelId)
    }

    this.newMessageRef.current.focus()
  }

  handleLogout() {
    this.props.signOutUser()
      .then(() => {
        this.props.history.push('/login')
      })
  }

  handleSendMessage(e) {
    e.preventDefault()

    this.props.sendMessage({
      ...this.state.newMessage,
      user: this.props.currentUser.attributes,
      channel: this.props.currentChannel
    })

    this.setState({
      newMessage: {
        text: ''
      }
    })
  }

  handleNewMessageChange(e) {
    this.setState({
      newMessage: {
        ...this.state.newMessage,
        text: e.target.value
      }
    })
  }

  isNewMessageValid() {
    return this.state.newMessage.text.trim().length > 0
  }

  subscribeChannels() {
    if (!this.consumer) {
      const uid = this.props.currentUser.attributes.uid
      const token = localStorage["access-token"]
      const clientId = localStorage["client"]
    
      this.consumer = createConsumer({
        uid: uid,
        token: token,
        clientId: clientId
      })

      this.appearanceChannel = this.consumer.subscriptions.create(
        {
          channel: "AppearanceChannel",
        },
        {
          received: (users) => {
            this.props.setUsersOnline(users)
          },
        }
      )

      this.chatChannel = this.consumer.subscriptions.create(
        {
          channel: "ChatChannel"
        },
        {
          received: (message) => {
            if (message.user.id != this.props.currentUser.attributes.id) {
              this.props.addMessage({
                ...message
              })
            }
          },
        }
      )
    }
  }

  render() {
    return (
      <div className="layout">
        <Sidebar />

        <div className="main-content">
          <div className="chat">
            <div className="chat-heading">
              <div className="user-menu float-right">
                <div className="user-menu-avatar">
                  <img src={this.props.currentUser.attributes.avatar_thumb_url} alt="My Avatar" />                  
                </div>
                <span className="user-menu-nickname">{this.props.currentUser.attributes.nickname}</span>

                <Link to="/profile" className="btn btn-link pull-right">Profile</Link>
                <a href="#" onClick={this.handleLogout} className="btn btn-link pull-right">Log out</a>
              </div>

              <h5> #{this.props.currentChannel}</h5>
            </div>

            <GroupedMessages messages={this.props.messages.byChannel(this.props.currentChannel)} />
            
            <div className="chat-new-message">
              <form>
                <input
                  ref="newMessageText"
                  autoFocus
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Message"
                  value={this.state.newMessage.text}
                  onChange={this.handleNewMessageChange}
                  ref={this.newMessageRef}
                  />
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSendMessage}
                  disabled={!this.isNewMessageValid() ? 'disabled' : ''}
                  >Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
  currentChannel: state.channels.current,
  currentUser: state.reduxTokenAuth.currentUser
})

export default connect(mapStateToProps, {
  fetchMessages,
  setCurrentChannel,
  signOutUser,
  sendMessage,
  addMessage,
  setUsersOnline
})(Chat)
