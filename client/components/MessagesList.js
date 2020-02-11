import React, {Component} from 'react'
import Message from './Message'
import NewMessageEntry from './NewMessageEntry'
import {connect} from 'react-redux'
import {getMessagesFromServer} from '../store/messages'
import OfferForm from './OfferForm'

class MessagesList extends Component {
  async componentDidMount() {
    await this.props.getMessagesFromServer(this.props.match.params.swapId)
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
    //   message => message.swapId === swapId

    console.log('filtered', filteredMessages)
    return (
      <div id="outerchatcontainer">
        <div id="chatContainer">
          <div className="message-list">
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
                })}
            {filteredMessages}
          </div>
          {messages.length && <NewMessageEntry swapId={swapId} />}
        </div>
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
