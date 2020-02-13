import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {getUserInterests} from '../store/interests'
import {getUserServices} from '../store/services'
import {Link} from 'react-router-dom'
import StarRateIcon from '@material-ui/icons/StarRate'
import Ratings from 'react-ratings-declarative'

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getUserServices(this.props.user.id)
    this.props.getUserInterests(this.props.user.id)
  }

  render() {
    const {user, interests, services} = this.props
    return (
      <div className="userprofilecontainer">
        <div className="userleftProfile">
          <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>
            Hi, {user.firstName}!
          </div>
          <img src={user.photo} className="profilePhoto" />
          <br />
          <div>Overall Rating: {user.overallRating.toFixed(2)}</div>
          <br />
          <div>Email: {user.email}</div>
          <br />
          <div>Phone Number: {user.phoneNumber}</div>
          <br />
          <div>Bio: {user.bio}</div>
          <br />
          <div>Maximum Travel Distance: {user.distancePrefWeight}mi</div>
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
        </div>

        <div className="rightProfile">
          <div className="profileInterestsList">
            <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>
              Your Interests
            </div>
            <br />
            {interests.map(i => (
              <span className="singleinterest" key={i.id}>
                {i.name}
              </span>
            ))}
          </div>
          <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>
            Services You're Offering
          </div>
          <div className="servicelistcontainer">
            {services.map(s => (
              <div key={s.id} className="singleservice">
                <div className="servicephotobox">
                  <div className="servicename">{s.name}</div>
                  <Link to={`/users/${user.id}/services/${s.id}`}>
                    <img src={s.imageUrl} className="servicephoto" />
                  </Link>
                  <div className="servicerating">
                    <StarRateIcon
                      fontSize="small"
                      viewBox="0 0 24 24"
                      color="secondary"
                    />
                    <span>{s.serviceRating && s.serviceRating.toFixed(2)}</span>
                    <span style={{color: '#25665C'}}>{` (${
                      s.reviewCount
                    } Reviews)`}</span>
                  </div>
                </div>
                <div className="servicedescriptionbox">
                  <div>
                    <p>{s.description}</p>
                  </div>
                </div>
                <div className="verticalline" />
                <div className="servicerightside">
                  <div>
                    <div className="servicerightsidetitle">Skill Level</div>
                    <Ratings
                      rating={s.proficiency === null ? 1 : s.proficiency}
                      widgetRatedColors="gold"
                    >
                      <Ratings.Widget widgetDimension="15px" />
                      <Ratings.Widget widgetDimension="15px" />
                      <Ratings.Widget widgetDimension="15px" />
                    </Ratings>
                  </div>
                  <div>
                    <div className="servicerightsidetitle">Remote</div>
                    <div className="remote">{s.remote ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>
            ))}
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
