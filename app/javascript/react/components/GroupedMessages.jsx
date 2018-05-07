import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class GroupedMessages extends React.Component {
  constructor(props) {
    super(props)
    this.messagesRef = React.createRef()
  }

  messageGroups() {
    return this.props.messages.reduce((acc, current) => {
      let previous = acc[acc.length - 1] 

      if (previous &&
          previous.user.id == current.user.id &&
          moment.duration(moment(current.created_at).diff(moment(previous.time))).asMinutes() <= 5) {
        acc[acc.length - 1].messages.push(current)

        return [
          ...acc
        ]
      } else {
        return [
          ...acc,
          {
            time: current.created_at,
            user: current.user,
            messages: [current]
          }
        ]
      }
    }, [])
  }

  scrollMessages() {
    this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight
  }

  componentDidUpdate() {
    this.scrollMessages()
  }

  render() {
    return (
      <div className="chat-messages" ref={this.messagesRef}>
        {this.messageGroups().map((messageGroup, idx) => {
          return (
            <div key={idx} className="chat-message-group">
              {messageGroup.messages.map((message, messageIdx) => {
                return (
                  <div key={messageIdx} className="chat-message">
                    <div className="chat-message-gutter">
                      {message == messageGroup.messages[0] &&
                        <img src={messageGroup.user.avatar_thumb_url} alt="" className="chat-message-avatar" width="36" height="36" />
                      }
                    </div>
                    <div className="chat-message-content">
                      {message == messageGroup.messages[0] &&
                        <div>
                          <div className="chat-message-content-header">
                            <span className="chat-message-user">
                              {message.user.nickname}
                            </span>
                            <span> </span>
                            <span className="chat-message-timestamp">
                              {moment(message.created_at).format('LT')}
                            </span>
                          </div>
                          
                        </div>
                      }

                      <div className="chat-message-content-body">
                        {message.text}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default GroupedMessages
