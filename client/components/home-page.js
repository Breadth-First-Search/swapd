import React from 'react'
import axios from 'axios'
import SearchResultsTile from './SearchResultsTile'
import {Link} from 'react-router-dom'
import {getUnreviewedSwaps} from '../store/reviews'
import {connect} from 'react-redux'
import Reviews from './Reviews'

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      topUsers: []
    }
  }
  async componentDidMount() {
    const {data} = await axios.get('/api/users/top')

    this.setState({
      topUsers: data
    })
    this.props.getUnreviewedSwaps(this.props.user.id)
  }

  render() {
    console.log(this.state)
    return this.props.reviews.length > 0 ? (
      <div>
        <Reviews />
        <ul>
          {this.state.topUsers.length &&
            this.state.topUsers.map(user => {
              return (
                <Link key={user.id} to={`/user-profile/${user.id}`}>
                  <img className="searchResultsImg" src={user.photo} />
                  <div className="searchResultsName">
                    {user.firstName} {user.lastName}
                  </div>
                  <div>
                    Overall Rating:{' '}
                    {`${user.overallRating.toFixed(2)} (${user.reviewCount})`}{' '}
                  </div>
                </Link>
              )
            })}
        </ul>
      </div>
    ) : (
      <div>
        <ul>
          {this.state.topUsers.length &&
            this.state.topUsers.map(user => {
              return (
                <div key={user.id}>
                  <Link to={`/user-profile/${user.id}`}>
                    <li>{user.firstName}</li>
                  </Link>
                </div>
              )
            })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {reviews: state.reviews.unreviewedSwaps, user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {getUnreviewedSwaps: id => dispatch(getUnreviewedSwaps(id))}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
