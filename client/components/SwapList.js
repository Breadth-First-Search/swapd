import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {loadAllSwaps} from '../store/swaps'
import {Link} from 'react-router-dom'

class SwapList extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
    this.formatDate = this.formatDate.bind(this)
  }

  componentDidMount() {
    this.props.onLoadAllSwaps(this.props.user.id)
    this.setState({isLoading: false})
  }

  formatDate(date) {
    const formatted = new Date(date)

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]

    const day = formatted.getDate()
    const monthIndex = formatted.getMonth()
    const year = formatted.getFullYear()

    return monthNames[monthIndex] + ' ' + day + ', ' + year
  }

  render() {
    const swaps = this.props.swaps
    console.log(swaps)

    return !this.state.isLoading ? (
      <div>
        {swaps.map(swap => {
          const otherUser =
            swap.requesterId === this.props.user.id ? 'responder' : 'requester'
          const otherUserData = swap.messages[0][otherUser]
          const newDate = this.formatDate(
            swap.messages[swap.messages.length - 1].createdAt.slice(0, 10)
          )
          return (
            <Link to={`/swaps/${swap.id}`} key={swap.id}>
              <div className="swaplistcontainer">
                <div className="swaplistdetails">
                  <img className="swapListImage" src={otherUserData.photo} />
                  <div>
                    <div>{otherUserData.firstName}</div>
                    <div>{newDate}</div>
                  </div>
                  <div>{swap.messages[swap.messages.length - 1].text}</div>
                  <div>{swap.swapStatus}</div>
                </div>
                <hr />
              </div>
            </Link>
          )
        })}
      </div>
    ) : (
      <div />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    swaps: state.swaps
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadAllSwaps: function(userId) {
      dispatch(loadAllSwaps(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapList)
