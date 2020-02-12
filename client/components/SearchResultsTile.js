import React from 'react'
import {NavLink} from 'react-router-dom'

export default class SearchResultsTile extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {}

  render() {
    let result = this.props.result
    return (
      <div className="searchResultsInner">
        <NavLink to={`/users/${result.id}/services/${result.services[0].id}`}>
          <img className="searchResultsImg" src={result.photo} />
          <div className="searchResultsName">
            {result.firstName} {result.lastName}
          </div>
          <div>
            {result.firstName}'s' Overall Rating:{' '}
            {`${result.overallRating.toFixed(2)}`}{' '}
          </div>

          <div>
            Rating for {result.services[0].name}:{' '}
            {result.services[0].serviceRating.toFixed(2)}
          </div>
        </NavLink>
      </div>
    )
  }
}
