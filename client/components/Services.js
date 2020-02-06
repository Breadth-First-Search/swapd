import React from 'react'
import {connect} from 'react-redux'
import {
  getServiceCategories,
  addUserService,
  getUserServices
} from '../store/services'
// getServices,
// getUserServices and Categories
// get categories
// addUserService with Category
// writeService

class Services extends React.Component {
  constructor() {
    super()
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    //  this.props.getAllServices()
    this.props.getServiceCategories()
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const newUserService = {
      userId: this.props.user.id,
      serviceCategories: this.state.value
    }
    // console.log('state in submit', evt.target.value)
    // console.log('new user interest in submit', newUserInterest)
    // this.props.addUserInterest(newUserInterest)
  }

  handleChange(evt) {
    this.setState({value: evt.target.value})
  }

  render() {
    const {serviceCategories} = this.props

    return (
      // userServices && (
      <div>
        {/* <h4>Your Services:</h4>
          <div>
            {userServices.map(us => (
              <li key={us.id}>{us.name}</li>
            ))}
          </div> */}
        <div>ADD A SERVICE</div>
        Pick A Service Category:
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              autoComplete="on"
              list="serviceCategories"
              onChange={this.handleChange}
            />
            <datalist id="serviceCategories">
              {serviceCategories.map(sc => (
                <option key={sc.id} value={sc.name} />
              ))}
            </datalist>
            <button type="submit">ADD</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    serviceCategories: state.services.serviceCategories,
    userServices: state.services.userServices,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getServiceCategories: () => dispatch(getServiceCategories()),
    getUserServices: id => dispatch(getUserServices(id)),
    addUserService: service => dispatch(addUserService(service))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)
