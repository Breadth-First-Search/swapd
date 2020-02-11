import React from 'react'
import {connect} from 'react-redux'
import {getUserInterests} from '../store/interests'
// import {getUserServices} from '../store/services'
import {loadSelectedUser} from '../store/user'
import StarRateIcon from '@material-ui/icons/StarRate'
import {Link} from 'react-router-dom'
import Ratings from 'react-ratings-declarative'

class SelectedUserProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      matchingInterests: []
    }
    this.getMatchingInterests = this.getMatchingInterests.bind(this)
  }

  getMatchingInterests() {
    const selectedUsersInterests = new Set(this.props.selectedUser.interests)
    const matchingInterests = []
    for (let userInterest of this.props.interests) {
      if (userInterest in selectedUsersInterests) {
        matchingInterests.push(userInterest)
      }
    }

    this.setState({isLoading: false, matchingInterests})
  }

  componentDidMount() {
    //load selected user's info, interests, and services
    try {
      this.props.getSelectedUser(this.props.match.params.userId).then(() => {
        this.props.getUserInterests(this.props.user.id).then(() => {
          //check to see if there is a matching interest between user and selected user profile then set to local state
          this.getMatchingInterests()
        })
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
            <StarRateIcon viewBox="0 0 24 24" />
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
          <div style={{fontSize: '1.5em', fontWeight: 'bold'}}>Services</div>
          <div id="servicelistcontainer">
            {selectedUser.services.map(s => {
              return (
                <div className="singleservice" key={s.id}>
                  <div className="servicephotobox">
                    <div className="servicename">{s.name}</div>
                    <Link to={`/users/${selectedUser.id}/services/${s.id}`}>
                      <img src={s.imageUrl} className="servicephoto" />
                    </Link>
                    <div className="servicerating">
                      <StarRateIcon
                        fontSize="small"
                        viewBox="0 0 24 24"
                        color="secondary"
                      />
                      <span>{s.serviceRating.toFixed(2)}</span>
                      <span style={{color: '#25665C'}}>{` (${
                        s.reviewCount
                      })`}</span>
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
                      <Ratings rating={s.proficiency} widgetRatedColors="gold">
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
              )
            })}
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
