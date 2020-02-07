import React from 'react'
import {connect} from 'react-redux'
import {getUserInterests} from '../store/interests'
import {getUserServices} from '../store/services'
import {loadSelectedUser} from '../store/user'

class SelectedUserProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    //add interests and services for user along with user info
    //load user's interests
    //load user's services
    try {
      this.props.getSelectedUser(this.props.match.params.userId)
      this.props.getUserServices(this.props.match.params.userId)
      this.props
        .getUserInterests(this.props.match.params.userId)
        .then(() => this.setState({isLoading: false}))
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {selectedUser} = this.props
    return !this.state.isLoading ? (
      <div>
        <div className="leftProfile">
          <img src={selectedUser.photo} className="profilePhoto" />
          <div>Overall Rating: {selectedUser.overallRating}</div>
          <div>Email: {selectedUser.email}</div>
          <div>Phone Number: {selectedUser.phoneNumber}</div>
          <div>
            Maximum Travel Distance: {selectedUser.distancePrefWeight}mi
          </div>
          <div>
            Interests:
            {selectedUser.interests.map(i => <li key={i.id}>{i.name}</li>)}
          </div>
        </div>
        <div className="rightProfile">
          <div>
            Services:
            {selectedUser.services.map(s => <li key={s.id}>{s.name}</li>)}
          </div>
        </div>
      </div>
    ) : (
      <div />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    selectedUser: state.selectedUser,
    interests: state.interests.userInterests,
    services: state.services.userServices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSelectedUser: id => dispatch(loadSelectedUser(id)),
    getUserInterests: id => dispatch(getUserInterests(id)),
    getUserServices: id => dispatch(getUserServices(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedUserProfile)
