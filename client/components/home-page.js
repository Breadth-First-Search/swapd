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
    return this.props.reviews.length > 0 ? (
      <div>
        <Reviews />
        <ul>
          {this.state.topUsers.length &&
            this.state.topUsers.map(user => {
              return (
                <Link key={user.id} to={`/user-profile/${user.id}`}>
                  <li>{user.firstName}</li>
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
                <Link key={user.id} to={`/user-profile/${user.id}`}>
                  <li>{user.firstName}</li>
                </Link>
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
