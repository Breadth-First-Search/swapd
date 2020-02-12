import React from 'react'
import {connect} from 'react-redux'
import {editUser} from '../store/user'
import Interests from './interests'
import Services from './Services'

class EditUserProfile extends React.Component {
  constructor() {
    super()

    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const newState = {
      distancePrefWeight: this.props.user.distancePrefWeight,
      bio: this.props.user.bio,
      phoneNumber: this.props.user.phoneNumber,
      zipcode: this.props.user.zipcode,
      email: this.props.user.email
    }
    this.setState(newState)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateUser(this.props.user.id, this.state)
  }

  render() {
    const {user} = this.props
    return (
      <div id="profileContainer">
        <div className="leftEditProfile">
          <div className="boldText">Hi, {user.firstName}</div>
          <img src={user.photo} className="profilePhoto" />
          <div>Overall Rating: {user.overallRating.toFixed(2)}</div>
          <div className="leftEditProfileInfo">
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="email">
                  <small>Email:</small>
                </label>
                <input
                  className="editFields"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="text"
                  size="50"
                />
                <br />
                <br />
                <label htmlFor="phoneNumber">
                  <small>Phone Number:</small>
                </label>
                <input
                  className="editFields"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                  type="text"
                  size="12"
                />
                <br />
                <br />
                <label htmlFor="distancePrefWeight">
                  <small>"Maximum Travel Distance (mi):"</small>
                </label>
                <input
                  className="editFields"
                  name="distancePrefWeight"
                  value={this.state.distancePrefWeight}
                  onChange={this.handleChange}
                  type="text"
                  size="4"
                />
                <br />
                <br />
                <label htmlFor="zipcode">
                  <small>ZIP Code:</small>
                </label>
                <input
                  className="editFields"
                  name="zipcode"
                  value={this.state.zipcode}
                  onChange={this.handleChange}
                  type="text"
                  size="5"
                />
                <br />
                <br />
                <label htmlFor="bio">
                  <small>Your Bio:</small>
                </label>
                <textarea
                  className="editDescription"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  type="text"
                  size="200"
                  rows="5"
                />
                <button type="submit">SAVE CHANGES</button>
              </div>
            </form>
          </div>
        </div>
        <div className="rightEditProfile">
          <Interests />
          <Services />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {updateUser: (id, edits) => dispatch(editUser(id, edits))}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile)
