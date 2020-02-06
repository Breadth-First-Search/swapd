import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {getUserInterests} from '../store/interests'
import {getUserServices} from '../store/services'
import {Link} from 'react-router-dom'

class UserProfile extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    //add interests and services for user along with user info
    //load user's interests
    //load user's services

    this.props.getUserServices(this.props.user.id)
    this.props.getUserInterests(this.props.user.id)
  }

  render() {
    const {user, interests, services} = this.props
    return (
      <div id="profileContainer">
        <div className="leftProfile">
          <img src={user.photo} className="profilePhoto" />
          <div>Overall Rating: {user.overallRating.toFixed(2)}</div>
          <div>Email: {user.email}</div>
          <div>Phone Number: {user.phoneNumber}</div>
          <div>Maximum Travel Distance: {user.distancePrefWeight}mi</div>
          <div>
            Interests:
            {interests.map(i => <li key={i.id}>{i.name}</li>)}
          </div>
        </div>
        <div className="rightProfile">
          <div>
            Services:
            {services.map(s => <li key={s.id}>{s.name}</li>)}
          </div>
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
              Edit Profile
            </Link>
          </Button>
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
