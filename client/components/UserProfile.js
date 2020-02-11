import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {getUserInterests} from '../store/interests'
import {getUserServices} from '../store/services'
import {Link} from 'react-router-dom'

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getUserServices(this.props.user.id)
    this.props.getUserInterests(this.props.user.id)
  }

  render() {
    const {user, interests, services} = this.props
    return (
      <div id="userProfile">
        <div className="leftProfile">
          <div className="userProfileMain">
            <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>
              Hi, {user.firstName}!
            </div>
            <img src={user.photo} className="profilePhoto" />
            <div>Overall Rating: {user.overallRating.toFixed(2)}</div>
            <div>Email: {user.email}</div>
            <div>Phone Number: {user.phoneNumber}</div>
            <div>Maximum Travel Distance: {user.distancePrefWeight}mi</div>
          </div>
          <div className="profileServicesList">
            <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>
              Services You're Offering:
            </div>
            {services.map(s => (
              <div key={s.id}>
                <li key={s.id}>{s.name}</li>
                <div>{s.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rightProfile">
          <div className="profileEditButton">
            <Button
              style={{backgroundColor: '#25665C'}}
              size="small"
              variant="contained"
              color="primary"
            >
              <Link
                style={{color: 'white', textDecoration: 'none'}}
                to="/user-profile-edit"
              >
                Edit Your Profile
              </Link>
            </Button>
          </div>

          <div className="profileInterestsList">
            <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>
              Your Interests:
            </div>
            {interests.map(i => <li key={i.id}>{i.name}</li>)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    interests: state.interests.userInterests,
    services: state.services.userServices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserInterests: id => dispatch(getUserInterests(id)),
    getUserServices: id => dispatch(getUserServices(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
