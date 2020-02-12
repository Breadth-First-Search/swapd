import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function Message(props) {
  const message = props.message

  let senderName =
    props.message.userId === props.message.responderId
      ? `${props.message.responder.firstName} ${
          props.message.responder.lastName
        }`
      : `${props.message.requester.firstName} ${
          props.message.requester.lastName
        }`

  let senderPhoto =
    props.message.userId === props.message.responderId
      ? `${props.message.responder.photo}`
      : `${props.message.requester.photo}`

  const toFormat = new Date(message.createdAt)

  function formatAMPM(date) {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  let time = formatAMPM(toFormat)
  
  return props.message.userId !== props.user.id ? (
    <Link to={`/user-profile/${props.message.userId}`}>
      <div className="media-otheruser">
        <div className="media-left">
          <img className="media-object" src={senderPhoto} />
        </div>
        <div className="media-body">
          <div className="sender-name">{senderName}</div>
          <div>
            <div className="media-bubble">{message.text}</div>
          </div>
        </div>
        <div className="message-timestamp-container">
          <div className="message-timestamp">{time}</div>
        </div>
      </div>
    </Link>
  ) : (
    <div className="media-user">
      <div className="message-timestamp-container">
        <div className="message-timestamp">{time}</div>
      </div>
      <div className="media-userbody">
        <div>
          <div className="media-userbubble">{message.text}</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Message)
