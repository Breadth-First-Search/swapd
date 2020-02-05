import React from 'react'
import {NavLink} from 'react-router-dom'

export default class SingleUserSnapshot extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick(e) {
    await this.props.getData()
  }

  render() {
    const user = this.props.user

    user.services.sort((serviceA, serviceB) => {
      return serviceB.serviceRating - serviceA.serviceRating
    })

    return (
      <div className="singleUserSnapshot">
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <h4>Overall Rating: {user.overallRating}</h4>
        <h4>
          Other services offered by {user.firstName} {user.lastName}
        </h4>
        <ul>
          {user.services.map((service, i) => {
            if (service.name === this.props.service.name) return
            return (
              <li key={i}>
                <NavLink
                  to={`/users/${user.id}/services/${service.id}`}
                  onClick={() => this.handleClick()}
                >
                  <p>
                    {service.name} - {service.serviceRating}
                  </p>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
