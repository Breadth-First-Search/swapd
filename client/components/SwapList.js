import React from 'react'
import {connect} from 'react-redux'
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

    return !this.state.isLoading && swaps.length >= 1 ? (
      <div className="swaplistcontainer">
        {swaps
          .sort(
            (a, b) =>
              a.messages[a.messages.length - 1].createdAt -
              b.messages[b.messages.length - 1].createdAt
          )
          .reverse()
          .map(swap => {
            const otherUser =
              swap.requesterId === this.props.user.id
                ? 'responder'
                : 'requester'
            const otherUserData = swap.messages[0][otherUser]
            const newDate = this.formatDate(
              swap.messages[swap.messages.length - 1].createdAt.slice(0, 10)
            )
            return (
              <div className="singleswapcontainer" key={swap.id}>
                <Link
                  to={`/swaps/${swap.id}`}
                  className="innersingleswapcontainer"
                >
                  <div className="swaplistimagecontainer">
                    <img className="swaplistimage" src={otherUserData.photo} />
                  </div>
                  <div className="swaplistnamedate">
                    <div>{otherUserData.firstName}</div>
                    <div>{newDate}</div>
                  </div>
                  <div className="swaplistmessage">
                    {swap.messages[swap.messages.length - 1].text}
                  </div>
                  <div className={`${swap.swapStatus}`}>{swap.swapStatus}</div>
                </Link>
              </div>
            )
          })}
      </div>
    ) : (
      <div className="messageMessage">Start a swap to begin messaging!</div>
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
