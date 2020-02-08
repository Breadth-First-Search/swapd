import React from 'react'
import {connect} from 'react-redux'
import {getUserInterests} from '../store/interests'
// import {getUserServices} from '../store/services'
import {loadSelectedUser} from '../store/user'
import StarRateIcon from '@material-ui/icons/StarRate'

class SelectedUserProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      matchingInterests: []
    }
  }

  componentDidMount() {
    //load user interests
    //load selected user's info, interests, and services
    try {
      this.props.getSelectedUser(this.props.match.params.userId)
      this.props.getUserInterests(this.props.user.id).then(() => {
        //check to see if there is a matching interest between user and selected user profile then set to local state
        const matchingInterests = []
        if (this.props.selectedUser.id !== this.props.user.id) {
          for (let selectedUserInterest of this.props.selectedUser.interests) {
            for (let userInterest of this.props.interests) {
              if (selectedUserInterest.id === userInterest.id) {
                matchingInterests.push(selectedUserInterest.id)
              }
            }
          }
        }
        this.setState({isLoading: false, matchingInterests})
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {selectedUser} = this.props
    return !this.state.isLoading ? (
      <div id="profileContainer">
        <div className="leftProfile">
          <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>
            {selectedUser.firstName} {selectedUser.lastName}
          </div>
          <img src={selectedUser.photo} className="profilePhoto" />
          <div id="overallRating">
            <StarRateIcon fontSize="small" viewBox="0 0 24 24" />
            <span className="overallRating">
              {selectedUser.overallRating.toFixed(2)}
            </span>
            <span style={{color: '#25665C'}}>{` (${
              selectedUser.reviewCount
            })`}</span>
          </div>
          <br />
          <div>Max Travel Distance: {selectedUser.distancePrefWeight} mi</div>
          <br />
          <div>
            <div className="interests">Interests:</div>
            <ul>
              {selectedUser.interests.map(interest => {
                if (this.state.matchingInterests.includes(interest.id)) {
                  return (
                    <li className="matching" key={interest.id}>
                      {interest.name}
                    </li>
                  )
                } else {
                  return <li key={interest.id}>{interest.name}</li>
                }
              })}
            </ul>
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
    getUserInterests: id => dispatch(getUserInterests(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedUserProfile)
