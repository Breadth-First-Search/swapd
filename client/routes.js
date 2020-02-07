import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import UserProfile from './components/user-profile'
import SelectedUserProfile from './components/SelectedUserProfile'
import EditProfile from './components/user-profile-edit'
import {
  Login,
  Signup,
  UserHome,
  SearchResults,
  SelectedService,
  HomePage,
  MessagesList
} from './components'
import Oauth from './components/o-auth'
import {me} from './store'
import SwapList from './components/SwapList'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/auth/google" component={Oauth} />
        {/* <Route exact path="/search/:serviceName" component={SearchResults} /> */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/user-profile" component={UserProfile} />
            <Route
              exact
              path="/user-profile/:userId"
              component={SelectedUserProfile}
            />

            <Route exact path="/swaps" component={SwapList} />

            <Route exact path="/swaps/:swapId" component={MessagesList} />

            <Route exact path="/user-profile-edit" component={EditProfile} />

            <Route
              exact
              path="/search/:serviceName"
              component={SearchResults}
            />
            <Route
              exact
              path="/users/:userId/services/:serviceId"
              component={SelectedService}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
        <Route component={HomePage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
