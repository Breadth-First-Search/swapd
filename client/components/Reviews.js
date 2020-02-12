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

    this.state = {
      rating: 0,
      comment: '',
      serviceId: '',
      userId: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getUnreviewedServices(this.props.serviceId).then(() =>
      this.setState({
        serviceId: this.props.serviceId,
        rating: 0,
        comment: '',
        userId: this.props.service.user.id
      })
    )
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

  formatDate(date) {
    const formatted = new Date(date)

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]

    const day = formatted.getDate()
    const monthIndex = formatted.getMonth()
    const year = formatted.getFullYear()

    return monthNames[monthIndex] + ' ' + day + ', ' + year
  }
  render() {
    const {service, swapDate} = this.props
    const formattedDate = this.formatDate(swapDate)
    return service.user && service.user.firstName ? (
      <div className="reviewContainer">
        <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>
          Please Review your {service.name} from {service.user.firstName}{' '}
          {service.user.lastName} on {formattedDate}:
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="reviewMaker">
            {/* <label htmlFor="rating"> */}
            <small>Rate The Service (0-5):</small>
            {/* </label> */}
            <input
              className="star"
              type="radio"
              name="rating"
              id="star1"
              value={1}
              onChange={this.handleChange}
            />
            <label htmlFor="star1" />
            <input
              className="star"
              type="radio"
              name="rating"
              id="star2"
              value={2}
              onChange={this.handleChange}
            />
            <label htmlFor="star2" />
            <input
              className="star"
              type="radio"
              name="rating"
              id="star3"
              value={3}
              onChange={this.handleChange}
            />
            <label htmlFor="star3" />
            <input
              className="star"
              type="radio"
              name="rating"
              id="star4"
              value={4}
              onChange={this.handleChange}
            />
            <label htmlFor="star4" />
            <input
              className="star"
              type="radio"
              name="rating"
              id="star5"
              value={5}
              onChange={this.handleChange}
            />
            <label htmlFor="star5" />
            {/* <inpu5
              nam5="rating"
              val5e={this.state.rating}
              onChange={this.handleChange}
              type="number"
              min="0"
              max="5"
              size="20"
            /> */}
            {/* <label htmlFor="comment"> */}
            <small>Let Everyone Know More About It:</small>
            {/* </label> */}
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
