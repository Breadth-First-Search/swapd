import React from 'react'
import {connect} from 'react-redux'
import {
  getInterests,
  getUserInterests,
  addUserInterest
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
          <div className="boldText">Your Interests:</div>
          <div>{userInterests.map(ui => <li key={ui.id}>{ui.name}</li>)}</div>
          Add A New Interest:
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
