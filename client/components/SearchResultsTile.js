import React from 'react'
import {NavLink} from 'react-router-dom'
import StarRateIcon from '@material-ui/icons/StarRate'

export default class SearchResultsTile extends React.Component {
  componentDidMount() {}

  render() {
    let result = this.props.result

    return (
      <div className="searchResultsInner">
        <NavLink to={`/users/${result.id}/services/${result.services[0].id}`}>
          <div>
            <img className="searchResultsImg" src={result.photo} />
            <div className="searchResultsName">
              {result.firstName} {result.lastName}
            </div>
          </div>
        </NavLink>
        <div>
          <div>
            <div id="overallRating">
              Overall: <StarRateIcon viewBox="0 0 24 24" />
              {`${result.overallRating.toFixed(2)}`}{' '}
            </div>
          </div>
        </div>
        <div className="searchresultsservicerating">
          {result.services[0].name}:{' '}
          <StarRateIcon
            fontSize="small"
            viewBox="0 0 24 24"
            color="secondary"
          />
          {result.services[0].serviceRating.toFixed(2)}
        </div>
      </div>
    )
  }
}
