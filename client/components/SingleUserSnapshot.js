import React from 'react'
import {NavLink} from 'react-router-dom'
import StarRateIcon from '@material-ui/icons/StarRate'

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
        {/* <div>
          Overall Rating: {user.overallRating.toFixed(2)}
        </div> */}
        <h4>
          Other Services by {user.firstName} {user.lastName}
        </h4>
        <div className="otherserviceslist">
          {user.services.map(service => {
            if (service.id === this.props.service.id) return
            return (
              <NavLink
                key={service.id}
                className="eachservicecontainer"
                to={`/users/${user.id}/services/${service.id}`}
                onClick={() => this.handleClick()}
              >
                <div className="eachservicename">{service.name}</div>
                <img className="eachservicephoto" src={service.imageUrl} />
                <div className="servicerating">
                  <StarRateIcon
                    fontSize="small"
                    viewBox="0 0 24 24"
                    color="secondary"
                  />
                  <span>{service.serviceRating.toFixed(2)}</span>
                  <span>{` (${service.reviewCount} Reviews)`}</span>
                </div>
              </NavLink>
            )
          })}
        </div>
      </div>
    )
  }
}
