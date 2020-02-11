import React from 'react'
import {connect} from 'react-redux'

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

  return props.message.userId !== props.user.id ? (
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
    </div>
  ) : (
    <div className="media-user">
      {/* <div className="media-right">
        <img className="media-object" src={senderPhoto} />
      </div> */}
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
