import React, {Component} from 'react'
import {writeMessage, postNewMessage} from '../store/messages'
import {connect} from 'react-redux'
import SendRoundedIcon from '@material-ui/icons/SendRounded'

class NewMessageEntry extends Component {
  constructor() {
    super()
    this.changeHandler = this.changeHandler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  changeHandler(evt) {
    this.props.write(evt.target.value)
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const text = this.props.newEntry

    const swapId = this.props.swapId

    const userId = this.props.userId

    const type = 'MESSAGE'

    this.props
      .post({userId, text, swapId, type})
      .then(() => this.props.write(''))
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <input
          className="form-control"
          type="text"
          name="text"
          value={this.props.newEntry}
          onChange={this.changeHandler}
          placeholder="Enter a message..."
        />
        <button className="sendButton" type="submit">
          <SendRoundedIcon />
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    newEntry: state.newEntry,
    userId: state.user.id
  }
}
const mapDispatchToProps = dispatch => {
  return {
    write: input => dispatch(writeMessage(input)),

    post: message => dispatch(postNewMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry)
