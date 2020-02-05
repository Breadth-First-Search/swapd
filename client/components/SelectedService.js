import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import SingleUserSnapshot from './SingleUserSnapshot'

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

    return (
      <div>
        <h1>{service.name}</h1>
        <h3>
          Offered by {user.firstName} {user.lastName}
        </h3>
        <img src={service.imageUrl} />
        <p>{service.description}</p>
        <p>Proficiency: {service.proficiency}</p>
        {user.firstName ? (
          <SingleUserSnapshot
            user={user}
            getData={this.getData}
            service={service}
          />
        ) : null}
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
