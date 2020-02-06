import React from 'react'
import {connect} from 'react-redux'
import {
  getInterests,
  getUserInterests,
  addUserInterest,
  deleteUserInterest,
  writeInterest
} from '../store/interests'

class Interests extends React.Component {
  constructor() {
    super()
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getAllInterests()
    await this.props.getUserInterests(this.props.user.id)
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const newUserInterest = {
      userId: this.props.user.id,
      name: this.state.value
    }
    console.log('state in submit', evt.target.value)
    console.log('new user interest in submit', newUserInterest)
    this.props.addUserInterest(newUserInterest)
  }

  handleChange(evt) {
    this.setState({value: evt.target.value})
  }

  render() {
    const {allInterests, userInterests} = this.props

    return (
      userInterests && (
        <div>
          <h4>Your Interests:</h4>
          <div>{userInterests.map(ui => <li key={ui.id}>{ui.name}</li>)}</div>
          Add an interest:
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                autoComplete="on"
                list="interests"
                onChange={this.handleChange}
              />
              <datalist id="interests">
                {allInterests.map(i => <option key={i.id} value={i.name} />)}
              </datalist>
              <button type="submit">ADD</button>
            </form>
          </div>
        </div>
      )
    )

    //add new interest to interests table and to user's interests if unique and update for all via socket
  }
}

const mapStateToProps = state => {
  return {
    allInterests: state.interests.all,
    userInterests: state.interests.userInterests,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllInterests: () => dispatch(getInterests()),
    getUserInterests: id => dispatch(getUserInterests(id)),
    addUserInterest: interest => dispatch(addUserInterest(interest))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Interests)
