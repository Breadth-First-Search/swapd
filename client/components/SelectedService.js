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
      user: {}
    }

    this.getData = this.getData.bind(this)
  }

  async getData() {
    try {
      let user = await axios.get(`/api/users/${this.props.match.params.userId}`)
      let service = await axios.get(
        `/api/services/${this.props.match.params.serviceId}`
      )

      this.setState({
        user: user.data,
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

  render() {
    let user = this.state.user
    let service = this.state.service
    service.id = Number(this.props.match.params.serviceId)

    let reviewsPerService
    if (service.reviews) {
      reviewsPerService = service.reviews
    }

    let rating
    if (user.hasOwnProperty('id')) {
      rating = user.overallRating
    }

    return (
      <div id="selectedServiceContainer">
        <div id="selectedserviceleftcontainer">
          <div className="selectedservicedetails">
            <div className="selectedservicetitle">{service.name}</div>
            <div>
              <NavLink to={`/user-profile/${user.id}`}>
                <div className="selectedserviceuser">
                  by {user.firstName} {user.lastName}
                </div>
              </NavLink>
              <span>
                <div className="skilllevelcontainer">
                  <div className="skilllevelname">Level</div>
                  <Ratings
                    rating={service.proficiency}
                    widgetRatedColors="gold"
                  >
                    <Ratings.Widget widgetDimension="15px" />
                    <Ratings.Widget widgetDimension="15px" />
                    <Ratings.Widget widgetDimension="15px" />
                  </Ratings>
                </div>
                {/* <div id="overallRating">
                <StarRateIcon viewBox="0 0 24 24" />
                <span className="overallRating">
                  {rating && rating.toFixed(2)}
                </span>
                <span style={{color: '#25665C'}}>{` (${
                  user.reviewCount
                } Reviews)`}</span>
              </div> */}
              </span>
            </div>
            <div>
              <img className="selectedservicephoto" src={service.imageUrl} />
            </div>
          </div>
          <p style={{textAlign: 'left'}}>{service.description}</p>

          <InitiateSwapButton providerUser={user} providerService={service} />
          {user.firstName ? (
            <SingleUserSnapshot
              user={user}
              getData={this.getData}
              service={service}
            />
          ) : null}
        </div>
        <div id="selectedservicerightcontainer">
          <div>
            {reviewsPerService &&
              reviewsPerService.map(review => (
                <li key={review.id}>
                  <div>{review.rating}</div>
                  <h3>{review.comment}</h3>
                </li>
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedService)
