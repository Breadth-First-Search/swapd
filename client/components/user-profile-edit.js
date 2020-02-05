import React from 'react'
import {connect} from 'react-redux'
import {editUser} from '../store/user'
// import Interests from './interests'

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
      bio: this.props.user.bio
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
      <div>
        <img src={user.photo} className="profilePhoto" />
        <div>Overall Rating: {user.overallRating}</div>
        <div>Email: {user.email}</div>
        <div>Phone Number: {user.phoneNumber}</div>

        <div>Maximum Travel Distance: {user.distancePrefWeight}mi</div>

        <form onSubmit={this.handleSubmit}>
          {
            <div>
              <label htmlFor="distancePrefWeight">
                <small>Max Travel Distance:</small>
              </label>
              <input
                name="distancePrefWeight"
                value={this.state.distancePrefWeight}
                onChange={this.handleChange}
                type="text"
                size="4"
              />

              <label htmlFor="bio">
                <small>Your Bio:</small>
              </label>
              <input
                name="bio"
                value={this.state.bio}
                onChange={this.handleChange}
                type="text"
                size="200"
              />
            </div>
          }
          {/* <Interests /> */}
          <button type="submit">SAVE</button>
        </form>
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
