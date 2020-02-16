import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import SingleUserSnapshot from './SingleUserSnapshot'
import {NavLink} from 'react-router-dom'
import InitiateSwapButton from './InitiateSwapButton'
import StarRateIcon from '@material-ui/icons/StarRate'
import Ratings from 'react-ratings-declarative'

class SelectedService extends React.Component {
  constructor() {
    super()
    this.state = {
      service: {},
      selectedUser: {}
    }
    this.getData = this.getData.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }

  async getData() {
    try {
      let user = await axios.get(`/api/users/${this.props.match.params.userId}`)
      let service = await axios.get(
        `/api/services/${this.props.match.params.serviceId}`
      )

      this.setState({
        selectedUser: user.data,
        service: service.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    try {
      await this.getData()
    } catch (err) {
      console.log(err)
    }
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

    const monthIndex = formatted.getMonth()
    const year = formatted.getFullYear()

    return monthNames[monthIndex] + ' ' + year
  }

  render() {
    let selectedUser = this.state.selectedUser
    let service = this.state.service
    let user = this.props.user
    service.id = Number(this.props.match.params.serviceId)

    let reviewsPerService
    if (service.reviews) {
      reviewsPerService = service.reviews
    }

    let rating
    if (selectedUser.hasOwnProperty('id')) {
      rating = selectedUser.overallRating
    }

    console.log(selectedUser, user, service)

    return (
      <div id="selectedServiceContainer">
        <div id="selectedserviceleftcontainer">
          <div className="selectedservicedetails">
            <div className="selectedservicetitle">{service.name}</div>
            <div className="selectedserviceuser">
              <NavLink to={`/user-profile/${selectedUser.id}`}>
                <div className="selectedserviceusername">
                  by {selectedUser.firstName} {selectedUser.lastName}
                </div>
              </NavLink>
              <span>
                <div className="selectedserviceuserrating">
                  <StarRateIcon fontSize="small" viewBox="0 0 24 24" />
                  <span className="overallRating">
                    {rating && rating.toFixed(2)}
                  </span>
                  <span>{` (${selectedUser.reviewCount} Reviews)`}</span>
                </div>
              </span>
            </div>
            <hr />
            <div>
              <div className="skilllevelcontainer">
                <div className="skilllevelname">Level</div>
                <Ratings rating={service.proficiency} widgetRatedColors="gold">
                  <Ratings.Widget widgetDimension="15px" />
                  <Ratings.Widget widgetDimension="15px" />
                  <Ratings.Widget widgetDimension="15px" />
                </Ratings>
              </div>
            </div>
            <div>
              <img className="selectedservicephoto" src={service.imageUrl} />
            </div>
          </div>
          <p className="selectedservicetext">{service.description}</p>

          {user.id !== selectedUser.id ? (
            <InitiateSwapButton providerUser={user} providerService={service} />
          ) : null}
          {selectedUser.firstName ? (
            <SingleUserSnapshot
              user={selectedUser}
              getData={this.getData}
              service={service}
            />
          ) : null}
        </div>
        <div id="selectedservicerightcontainer">
          <div className="selectedserviceratingcontainer">
            <div className="reviewtitle">Reviews ({service.reviewCount})</div>
            <div className="selectedserviceratingvalue">
              <span>
                {service.serviceRating && service.serviceRating.toFixed(2)}
              </span>
              <span>
                <Ratings
                  rating={service.serviceRating}
                  widgetRatedColors="#f50057"
                  widgetSpacings="3px"
                >
                  <Ratings.Widget widgetDimension="24px" />
                  <Ratings.Widget widgetDimension="24px" />
                  <Ratings.Widget widgetDimension="24px" />
                  <Ratings.Widget widgetDimension="24px" />
                  <Ratings.Widget widgetDimension="24px" />
                </Ratings>
              </span>
            </div>
          </div>
          <div className="selectedservicereviewscontainer">
            {reviewsPerService &&
              reviewsPerService.map((review, idx) => (
                <div className="review-details-container" key={idx}>
                  <div className="review-user-photo">
                    <NavLink to={`/user-profile/${review.user.id}`}>
                      <img src={review.user.photo} />
                    </NavLink>
                  </div>
                  <div className="review-user-details">
                    <div>
                      {`${review.user.firstName} ${review.user.lastName}`}
                    </div>
                    <div className="review-user-date">
                      {this.formatDate(review.createdAt)}
                    </div>
                    <div>
                      <Ratings
                        rating={service.serviceRating}
                        widgetRatedColors="#f50057"
                        widgetSpacings="0px"
                      >
                        <Ratings.Widget widgetDimension="12px" />
                        <Ratings.Widget widgetDimension="12px" />
                        <Ratings.Widget widgetDimension="12px" />
                        <Ratings.Widget widgetDimension="12px" />
                        <Ratings.Widget widgetDimension="12px" />
                      </Ratings>
                    </div>
                  </div>
                  <div className="review-user-comment">{review.comment}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedService)
