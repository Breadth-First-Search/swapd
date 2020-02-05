import React from 'react'
import {connect} from 'react-redux'
import {
  getInterests,
  getUserInterests,
  addUserInterest,
  writeInterest
} from '../store/interests'

class Interests extends React.Component {
  constructor() {
    super()
    this.state = {value: {}}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getAllInterests() // gets all interests
    await this.props.getUserInterests(this.props.user.id) //gets singe user's interests
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addUserInterest(evt.target.value)

    //add interest to userInterest model and to userInterests on store
  }

  handleChange(evt) {
    this.setState({value: evt.target.value})
  }

  render() {
    const {allInterests, userInterests} = this.props
    console.log('props in interests', this.props)
    return (
      userInterests && (
        <div>
          {/* shows a list of one user's interests. */}
          <h4>Your Interests:</h4>
          <div>{userInterests.map(ui => <li key={ui.id}>{ui.name}</li>)}</div>

          {/* drop down list of all possible interests..ideally we want this to be a try search */}
          <form onSubmit={this.handleSubmit}>
            <label className="pickInterests">
              Choose some interests:
              <select value={this.state.value} onChange={this.handleChange}>
                {allInterests.map(i => (
                  <option key={i.id} value={i}>
                    {i.name}
                  </option>
                ))}
              </select>
              <input type="submit" value="Submit" />
            </label>
          </form>
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
