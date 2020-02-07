import React from 'react'
import {connect} from 'react-redux'

class OfferForm extends React.Component {
  constructor() {
    super()
    // console.log("fdfadsfadsf")
  }

  componentDidMount() {}

  render() {
    const requesterId = this.props.offer.requester.id
    const responderId = this.props.offer.responder.id
    let you
    let them
    if (this.props.user.id === requesterId) {
      you = this.props.offer.requester
      them = this.props.offer.responder
    } else {
      you = this.props.offer.responder
      them = this.props.offer.requester
    }

    let youWant
    let theyWant

    if (you.id === requesterId) {
      youWant = this.props.offer.swap.responderService
      theyWant = this.props.offer.swap.requesterService
    } else {
      youWant = this.props.offer.swap.requesterService
      theyWant = this.props.offer.swap.responderService
    }

    console.log(this.props.theyWant)

    return (
      <div>
        {youWant && <p>You want: {youWant.name}</p>}
        {theyWant && (
          <p>
            {`${them.firstName} ${them.lastName}`} wants: {theyWant.name}
          </p>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm)
