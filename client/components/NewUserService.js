import React from 'react'
import {connect} from 'react-redux'
import {addUserService, getServices} from '../store/services'
import history from '../history'

class NewUserService extends React.Component {
  constructor() {
    super()
    this.state = {service: '', description: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getServices()
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const userId = this.props.user.id
    const newUserService = {
      service: this.state.service,
      description: this.state.description
    }
    this.props.addUserService(userId, newUserService)

    history.push('/')
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    const {services} = this.props
    return (
      <div className="newUserServiceContainer">
        <div className="innerNewUserService">
          <div className="newUserServiceHeader">Let's Get Started</div>
          <div className="newUserServiceText">
            To search for services or skills you want, enter something you're
            good at that you'd be happy to share with others!
          </div>

          <form onSubmit={this.handleSubmit} className="newUserServiceForm">
            Service Name:
            <input
              type="text"
              autoComplete="on"
              size="40"
              name="service"
              list="service"
              onChange={this.handleChange}
            />
            <datalist id="service">
              {services.map(s => <option key={s.id} value={s.name} />)}
            </datalist>
            Description:
            <input
              className="serviceNameDescription"
              type="text"
              size="200"
              name="description"
              onChange={this.handleChange}
            />
            <button type="submit">ADD</button>
          </form>
          <div>
            And...to improve search results even more, enter your interests in
            your profile!
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    services: state.services.all,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getServices: () => dispatch(getServices()),
    addUserService: (id, serviceInfo) =>
      dispatch(addUserService(id, serviceInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserService)
