import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import SingleUserSnapshot from './SingleUserSnapshot'
import {NavLink} from 'react-router-dom'
import InitiateSwapButton from './InitiateSwapButton'

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
    console.log(reviewsPerService)

    return (
      <div id="selectedServiceContainer">
        <div>{service.name}</div>
        <span>
          <NavLink to={`/user-profile/${user.id}`}>
            <div>
              by {user.firstName} {user.lastName}
            </div>
          </NavLink>
        </span>

        <img style={{width: '50%'}} src={service.imageUrl} />
        <p>{service.description}</p>
        <p>Proficiency: {service.proficiency}</p>
        <InitiateSwapButton providerUser={user} providerService={service} />
        {user.firstName ? (
          <SingleUserSnapshot
            user={user}
            getData={this.getData}
            service={service}
          />
        ) : null}
        <ul>
          {reviewsPerService &&
            reviewsPerService.map((review, idx) => (
              <li key={idx}>
                <div>{review.rating}</div>
                <h3>{review.comment}</h3>
              </li>
            ))}
        </ul>
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
