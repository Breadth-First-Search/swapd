import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {getUnreviewedSwaps} from '../store/reviews'
import {connect} from 'react-redux'
import Reviews from './Reviews'
import TopTen from './TopTen'

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
        <TopTen topUsers={this.state.topUsers} />
      </div>
    ) : (
      <div>
        <TopTen topUsers={this.state.topUsers} />
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
