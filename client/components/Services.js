import React from 'react'
import {connect} from 'react-redux'
import {
  getServiceCategories,
  addUserService,
  getServices,
  getUserServices
} from '../store/services'

class Services extends React.Component {
  constructor() {
    super()
    this.state = {serviceCategories: '', service: '', description: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getServices()
    this.props.getServiceCategories()
    this.props.getUserServices(this.props.user.id)
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const userId = this.props.user.id
    const newUserService = {
      service: this.state.service,
      serviceCategories: this.state.serviceCategories,
      description: this.state.description
    }
    this.props.addUserService(userId, newUserService)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    const {serviceCategories, services, userServices} = this.props
    console.log(services)
    return (
      <div className="editServices">
        <div className="boldText">Your Offered Services:</div>
        {userServices.map(us => <li key={us.id}>{us.name}</li>)}

        <div>
          Add A New Service:
          <form onSubmit={this.handleSubmit}>
            <datalist id="serviceCategories">
              {serviceCategories.map(sc => (
                <option key={sc.id} value={sc.name} />
              ))}
            </datalist>
            <label htmlFor="service">
              <small>Service:</small>
            </label>
            <input
              type="text"
              autoComplete="on"
              name="service"
              list="service"
              onChange={this.handleChange}
            />
            <datalist id="service">
              {services.map((s, idx) => <option key={idx} value={s} />)}
            </datalist>
            <label htmlFor="description">
              <small>Description:</small>
            </label>
            <input
              className="editDescription"
              type="text"
              size="200"
              name="description"
              onChange={this.handleChange}
            />
            <button type="submit">ADD</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    services: state.services.all,
    serviceCategories: state.services.serviceCategories,
    userServices: state.services.userServices,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getServices: () => dispatch(getServices()),
    getServiceCategories: () => dispatch(getServiceCategories()),
    getUserServices: id => dispatch(getUserServices(id)),
    addUserService: (id, serviceInfo) =>
      dispatch(addUserService(id, serviceInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)
