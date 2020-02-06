import React from 'react'

export default function Message(props) {
  const message = props.message

  console.log(message)

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

  return (
    <li className="media">
      <div className="media-left">
        <img className="media-object" src={senderPhoto} />
      </div>
      <div className="media-body">
        <h4 className="media-heading">{senderName}</h4>
        {message.text}
      </div>
    </li>
  )
}
