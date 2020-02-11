import React from 'react'
import {connect} from 'react-redux'
import {postNewOffer} from '../store/messages'

class OfferForm extends React.Component {
  constructor() {
    super()
    // console.log("fdfadsfadsf")

    this.state = {
      selectedService: {},
      selectedServiceId: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {}

  async handleChange(e) {
    await this.setState({
      selectedService: e.target.label,
      selectedServiceId: e.target.value
    })
    console.log('SELECTED FROM DROPDOWN MENU ', this.state)
  }

  handleSubmit(e) {
    e.preventDefault()

    console.log('SUBMITTING', this.state)
    this.props.post(
      {
        userId: this.props.user.id,
        swapId: this.props.offer.swapId,
        type: 'CONFIRMED_OFFER'
      },
      this.props.offer.id,
      this.state.selectedServiceId
    )
  }

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

    const requesterServices = this.props.offer.requester.services

    let toRender

    if (you.id === responderId && this.props.offer.type === 'CURRENT_OFFER') {
      toRender = (
        <div className="offer_current_responder">
          <h4>Offer</h4>
          {youWant && (
            <p>
              You want:{' '}
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  autoComplete="on"
                  list="services"
                  onChange={this.handleChange}
                />
                <datalist id="services">
                  {requesterServices.map(service => {
                    return (
                      <option
                        key={service.id}
                        label={service.name}
                        value={service.id}
                      />
                    )
                  })}
                </datalist>
                <button type="submit">SEND</button>
              </form>
            </p>
          )}
          {theyWant && (
            <p>
              {`${them.firstName} ${them.lastName}`} wants: {theyWant.name}
            </p>
          )}
        </div>
      )
    } else if (
      you.id === requesterId &&
      this.props.offer.type === 'CURRENT_OFFER'
    ) {
      toRender = (
        <div className="offer_current_requester">
          <h4>Offer</h4>
          {youWant && <p>You want: {youWant.name}</p>}
          {theyWant && (
            <p>
              {`${them.firstName} ${them.lastName}`} wants: {theyWant.name}
            </p>
          )}
        </div>
      )
    }

    if (this.props.offer.type === 'CONFIRMED_OFFER') {
      toRender = (
        <div className="offer_confirmed">
          <h4>Confirmed Swap</h4>
          {youWant && <p> You are getting: {youWant.name}</p>}
          {theyWant && (
            <p>
              {' '}
              {`${them.firstName} ${them.lastName}`} is getting: {theyWant.name}{' '}
            </p>
          )}
        </div>
      )
    }

    return <div>{toRender}</div>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    post: (offer, prevId, selectedServiceId) =>
      dispatch(postNewOffer(offer, prevId, selectedServiceId))
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm)
