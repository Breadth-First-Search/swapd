import React from 'react'
import axios from 'axios'
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
      <div className="home-page-container">
        <div className="homeImgContainer">
          <div className="topHomeImg">Welcome to Swapd</div>
          <div className="middleHomeImg">
            Match with others to trade helpful skills or services. Maybe even
            make a friend along the way!
          </div>
          <div className="lowerHomeImg">Start your Search.</div>
          <img
            className="homeImg"
            src="https://images.unsplash.com/photo-1555436169-38f939820724"
          />
        </div>
        <TopTen topUsers={this.state.topUsers} />
        <Reviews />
      </div>
    ) : (
      <div>
        <div className="homeImgContainer">
          <div className="topHomeImg">Welcome to Swapd.</div>
          <div className="middleHomeImg">
            Match with others to trade helpful skills or services. Maybe even
            make a friend along the way!
          </div>
          <div className="lowerHomeImg">Start your Search.</div>
          <img
            className="homeImg"
            src="https://images.unsplash.com/photo-1555436169-38f939820724"
          />
        </div>
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
