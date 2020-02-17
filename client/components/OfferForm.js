/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {postNewOffer} from '../store/messages'
import {Link} from 'react-router-dom'
import StarRateIcon from '@material-ui/icons/StarRate'

class OfferForm extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedService: {},
      selectedServiceId: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleSubmit = this.throttler(this.handleSubmit, 3500).bind(this)
    this.throttledSubmit = this.throttler()
  }

  componentDidMount() {}

  throttler() {
    let currTime = new Date().getTime()
    let first = true

    function throttle(func, time, e) {
      let eventTime = new Date().getTime()
      // console.log(eventTime-currTime);

      if (eventTime - currTime > time || first) {
        func()
        currTime = eventTime
        first = false
      }
    }

    return throttle
  }

  async handleChange(e) {
    await this.setState({
      selectedService: e.target.label,
      selectedServiceId: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()

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
        <div className="offer_pending">
          <div className="offer_listcontainer">
            <div className="offer_title">Current Offer</div>
            {youWant && (
              <p>
                Select a service to swap:{' '}
                <form
                  onSubmit={e =>
                    this.throttledSubmit((this.handleSubmit(e), 3500))
                  }
                >
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
          </div>
          <div>
            {theyWant && (
              <p>
                {' '}
                {`${them.firstName} ${them.lastName}`} is requesting:{' '}
                {theyWant.name}{' '}
              </p>
            )}
          </div>
          <div className="offer_details">
            <Link to={`/users/${you.id}/services/${theyWant.id}`}>
              <img src={theyWant.imageUrl} className="offer_photo" />
              <div className="servicerating">
                <StarRateIcon
                  fontSize="small"
                  viewBox="0 0 24 24"
                  color="secondary"
                />
                <span>{theyWant.serviceRating.toFixed(2)}</span>
                <span style={{color: '#25665C'}}>{` (${
                  theyWant.reviewCount
                } Reviews)`}</span>
              </div>
            </Link>
            <div className="offer_description">{theyWant.description}</div>
          </div>
        </div>
      )
    } else if (
      you.id === requesterId &&
      this.props.offer.type === 'CURRENT_OFFER'
    ) {
      toRender = (
        <div className="offer_pending">
          <div className="offer_title">Current Offer</div>
          <div>{youWant && <p>You want: {youWant.name}</p>}</div>
          <div className="offer_details">
            <Link to={`/users/${them.id}/services/${youWant.id}`}>
              <img src={youWant.imageUrl} className="offer_photo" />
              <div className="servicerating">
                <StarRateIcon
                  fontSize="small"
                  viewBox="0 0 24 24"
                  color="secondary"
                />
                <span>{youWant.serviceRating.toFixed(2)}</span>
                <span style={{color: '#25665C'}}>{` (${
                  youWant.reviewCount
                } Reviews)`}</span>
              </div>
            </Link>
            <div>
              <div className="offer_description">{youWant.description}</div>
            </div>
          </div>
          <div>
            {theyWant && (
              <p>
                {' '}
                {`You are offering: ${theyWant.name}`}{' '}
                {/* {`${them.firstName} ${them.lastName}`} is requesting: {theyWant.name}{' '} */}
              </p>
            )}
          </div>
          <div className="offer_details">
            <Link to={`/users/${you.id}/services/${theyWant.id}`}>
              <img src={theyWant.imageUrl} className="offer_photo" />
              <div className="servicerating">
                <StarRateIcon
                  fontSize="small"
                  viewBox="0 0 24 24"
                  color="secondary"
                />
                <span>{theyWant.serviceRating.toFixed(2)}</span>
                <span style={{color: '#25665C'}}>{` (${
                  theyWant.reviewCount
                } Reviews)`}</span>
              </div>
            </Link>
            <div className="offer_description">{theyWant.description}</div>
          </div>
        </div>
      )
    } else if (this.props.offer.type === 'CONFIRMED_OFFER') {
      toRender = (
        <div className="offer_confirmed">
          <div className="offer_title">Confirmed Swap!</div>
          <svg
            className="confirmedsvg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
          >
            <circle
              className="path circle"
              fill="none"
              stroke="#73AF55"
              strokeWidth="6"
              strokeMiterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <polyline
              className="path check"
              fill="none"
              stroke="#73AF55"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
          </svg>
          <div>{youWant && <p>You want: {youWant.name}</p>}</div>
          <div className="offer_details">
            <Link to={`/users/${them.id}/services/${youWant.id}`}>
              <img src={youWant.imageUrl} className="offer_photo" />
              <div className="servicerating">
                <StarRateIcon
                  fontSize="small"
                  viewBox="0 0 24 24"
                  color="secondary"
                />
                <span>{youWant.serviceRating.toFixed(2)}</span>
                <span style={{color: '#25665C'}}>{` (${
                  youWant.reviewCount
                } Reviews)`}</span>
              </div>
            </Link>
            <div>
              <div className="offer_description">{youWant.description}</div>
            </div>
          </div>
          <div>
            {theyWant && (
              <p>
                {`You are offering: ${theyWant.name}`}{' '}
                {/* {`${them.firstName} ${them.lastName}`} is requesting: {theyWant.name}{' '} */}
              </p>
            )}
          </div>
          <div className="offer_details">
            <Link to={`/users/${you.id}/services/${theyWant.id}`}>
              <img src={theyWant.imageUrl} className="offer_photo" />
              <div className="servicerating">
                <StarRateIcon
                  fontSize="small"
                  viewBox="0 0 24 24"
                  color="secondary"
                />
                <span>{theyWant.serviceRating.toFixed(2)}</span>
                <span style={{color: '#25665C'}}>{` (${
                  theyWant.reviewCount
                } Reviews)`}</span>
              </div>
            </Link>
            <div className="offer_description">{theyWant.description}</div>
          </div>
        </div>
      )
    }

    return <div id="offer_Container">{toRender}</div>
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
