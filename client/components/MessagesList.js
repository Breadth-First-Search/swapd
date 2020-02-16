import React, {Component} from 'react'
import Message from './Message'
import NewMessageEntry from './NewMessageEntry'
import {connect} from 'react-redux'
import {
  getMessagesFromServer,
  connectToRoom,
  leaveRoom
} from '../store/messages'
import OfferForm from './OfferForm'

class MessagesList extends Component {
  constructor() {
    super()
    this.mesRef = React.createRef()
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  async componentDidMount() {
    await this.props.getMessagesFromServer(this.props.match.params.swapId)
    this.scrollToBottom()

    connectToRoom(this.props.match.params.swapId)
  }

  scrollToBottom() {
    this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  componentWillUnmount() {
    leaveRoom(this.props.match.params.swapId)
  }

  render() {
    const swapId = Number(this.props.match.params.swapId) // because it's a string "1", not a number!
    const messages = this.props.messages
    const filteredMessages = messages
      .filter(
        message =>
          message.type === 'CURRENT_OFFER' || message.type === 'CONFIRMED_OFFER'
      )
      .map(message => {
        return (
          <OfferForm offer={message} key={message.id} user={this.props.user} />
        )
      })

    //find the other user's full name
    let otherUserName = null
    const user = this.props.user
    if (this.props.messages.length && user.firstName) {
      otherUserName =
        user.id !== messages[0].requester.id
          ? `${messages[0].requester.firstName} ${
              messages[0].requester.lastName
            }`
          : `${messages[0].responder.firstName} ${
              messages[0].responder.lastName
            }`
    }

    console.log(filteredMessages)

    return (
      <div id="outerchatcontainer">
        <div id="chatContainer">
          <div className="message-list" ref={this.mesRef}>
            {otherUserName && (
              <div id="chatTitle">Chatting with: {otherUserName}</div>
            )}
            {messages.length &&
              messages
                .filter(message => message.type === 'MESSAGE')
                .map(message => {
                  return (
                    <Message
                      className="message"
                      message={message}
                      key={message.id}
                    />
                  )
                })
            // .concat([filteredMessages[filteredMessages.length - 1]])
            }
          </div>
          {messages.length && (
            <NewMessageEntry
              swapId={swapId}
              scrollToBottom={this.scrollToBottom}
            />
          )}
        </div>
        {filteredMessages[filteredMessages.length - 1]}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    messages: state.messages,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMessagesFromServer: swapId => dispatch(getMessagesFromServer(swapId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)
