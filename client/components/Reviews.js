import React from 'react'
import {connect} from 'react-redux'
import {
  getUnreviewedServices,
  submitReview,
  updateReviewStatus
} from '../store/reviews'

class Review extends React.Component {
  constructor() {
    super()

    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.setState({serviceId: this.props.serviceId, rating: '', comment: ''})
    this.props.getUnreviewedServices(this.props.serviceId)
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.submitReview(this.state)

    //calls a thunk to update the swap review status and clears the review
    this.props.updateReviewStatus(this.props.swapId, this.props.userId)
  }
  render() {
    const {service, swapDate} = this.props

    return service.user && service.user.firstName ? (
      <div>
        <div>
          Please Review your {service.name} from {service.user.firstName}{' '}
          {service.user.lastName} on {swapDate}:
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="rating">
              <small>Rating (0-5):</small>
            </label>
            <input
              name="rating"
              value={this.state.rating}
              onChange={this.handleChange}
              type="number"
              min="0"
              max="5"
              size="20"
            />
            <label htmlFor="comment">
              <small>Include your comments:</small>
            </label>
            <input
              name="comment"
              value={this.state.comment}
              onChange={this.handleChange}
              type="text"
              size="100"
            />
          </div>
          <button type="submit">SUBMIT REVIEW</button>
        </form>
      </div>
    ) : (
      ''
    )
  }
}

const mapStateToProps = state => {
  return {
    serviceId: state.reviews.unreviewedSwaps[0],
    swapDate: state.reviews.unreviewedSwaps[2],
    swapId: state.reviews.unreviewedSwaps[1],
    service: state.reviews.unreviewedServices,
    userId: state.user.id
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUnreviewedServices: id => dispatch(getUnreviewedServices(id)),
    submitReview: review => dispatch(submitReview(review)),
    updateReviewStatus: (swapId, userId) =>
      dispatch(updateReviewStatus(swapId, userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Review)
