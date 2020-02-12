import React from 'react'
import {connect} from 'react-redux'
import {
  getServiceCategories,
  addUserService,
  getServices,
  getUserServices
} from '../store/services'
import {Link} from 'react-router-dom'
import StarRateIcon from '@material-ui/icons/StarRate'
import Ratings from 'react-ratings-declarative'

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
    const {serviceCategories, services, userServices, user} = this.props

    return (
      <div className="editServices">
        <div className="boldText">Your Offered Services:</div>
        <div className="servicelistcontainer">
          {userServices.map(s => (
            <div key={s.id} className="singleservice">
              <div className="servicephotobox">
                <div className="servicename">{s.name}</div>
                <Link to={`/users/${user.id}/services/${s.id}`}>
                  <img src={s.imageUrl} className="servicephoto" />
                </Link>
                <div className="servicerating">
                  <StarRateIcon
                    fontSize="small"
                    viewBox="0 0 24 24"
                    color="secondary"
                  />
                  <span>{s.serviceRating && s.serviceRating.toFixed(2)}</span>
                  <span style={{color: '#25665C'}}>{` (${
                    s.reviewCount
                  } Reviews)`}</span>
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
                  <Ratings
                    rating={s.proficiency === null ? 1 : s.proficiency}
                    widgetRatedColors="gold"
                  >
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
          ))}
        </div>
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
            <textarea
              className="editDescription"
              type="text"
              size="200"
              name="description"
              onChange={this.handleChange}
              rows="5"
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
