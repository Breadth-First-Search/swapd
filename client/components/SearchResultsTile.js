import React from 'react'
import {NavLink} from 'react-router-dom'

export default class SearchResultsTile extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {}

  render() {
    let result = this.props.result
    // console.log(result)
    return (
      <div className="searchResultsInner">
        <NavLink to={`/users/${result.id}/services/${result.services[0].id}`}>
          <img className="searchResultsImg" src={result.photo} />
          <div className="searchResultsName">
            {result.firstName} {result.lastName}
          </div>
          <div>
            Overall Rating:{' '}
            {`${result.overallRating.toFixed(2)} (${result.reviewCount})`}{' '}
          </div>

          <div>
            Service Rating: {result.services[0].serviceRating.toFixed(2)}
          </div>
        </NavLink>
      </div>
    )
  }
}
