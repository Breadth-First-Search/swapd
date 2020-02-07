import React, {Component} from 'react'
import {writeMessage, postNewMessage} from '../store/messages'
import {connect} from 'react-redux'

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

    const type = 'CURRENT_OFFER'

    this.props.post({userId, text, swapId, type})
  }

  render() {
    // console.log('why so many props issues?', this.props);
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="text"
            value={this.props.newEntry}
            onChange={this.changeHandler}
            placeholder="Enter a message"
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
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
