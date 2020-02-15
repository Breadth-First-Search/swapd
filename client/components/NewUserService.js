import React from 'react'
import {connect} from 'react-redux'
import {addUserService, getServices} from '../store/services'
import history from '../history'
import {Link} from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

class NewUserService extends React.Component {
  constructor() {
    super()
    this.state = {
      service: '',
      description: '',
      proficiency: '1',
      remote: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggleRemote = this.handleToggleRemote.bind(this)
  }

  componentDidMount() {
    this.props.getServices()
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const userId = this.props.user.id
    const newUserService = {
      service: this.state.service,
      description: this.state.description,
      proficiency: Number(this.state.proficiency),
      remote: this.state.remote
    }
    console.log(newUserService)
    this.props.addUserService(userId, newUserService)

    history.push('/')
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleToggleRemote() {
    const remote = !this.state.remote
    this.setState({remote})
  }

  render() {
    const {services} = this.props
    return (
      <div className="newUserServiceContainer">
        <div className="innerNewUserService">
          <div className="newUserServiceHeader">Let's Get Started</div>
          <div className="newUserServiceText">
            To begin swapping for services you're interested in, enter anything
            you're good at that you'd be happy to share with others!
          </div>

          <form onSubmit={this.handleSubmit} className="newUserServiceForm">
            <div className="add-service-name-container">
              <div className="add-service-input-title">Service Name</div>
              <input
                className="add-service-name-input"
                type="text"
                autoComplete="on"
                size="40"
                name="service"
                list="service"
                onChange={this.handleChange}
              />
              <datalist id="service">
                {services.map(s => <option key={s.id} value={s} />)}
              </datalist>
            </div>

            <div className="add-service-description-container">
              <div className="add-service-input-title">Description</div>
              <textarea
                className="add-service-description-textarea"
                type="text"
                name="description"
                onChange={this.handleChange}
              />
            </div>

            <div className="add-service-proficiency-container">
              <div className="add-service-proficiency-box">
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Skill Level</Typography>
                  <Rating
                    name="proficiency"
                    max={3}
                    value={Number(this.state.proficiency)}
                    onChange={this.handleChange}
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(this.state.remote)}
                      value={this.state.remote}
                      onChange={this.handleToggleRemote}
                      name="remote"
                    />
                  }
                  label="Remote"
                />
              </div>
            </div>
            <button className="add-service-button" type="submit">
              ADD
            </button>
          </form>
          {/* <div>
            And...to improve search results even more, enter your interests in
            your profile!
          </div> */}
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
