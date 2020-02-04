import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Oauth from './o-auth'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <div>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="phoneNumber">
                <small>Phone Number</small>
              </label>
              <input name="phoneNumber" type="text" />
            </div>
            <div>
              <label htmlFor="bio">
                <small>Bio</small>
              </label>
              <input name="bio" type="text" />
            </div>
            {/* photo has no functionality */}
            <div>
              <label htmlFor="photo">
                <small>Photo</small>
              </label>
              <input name="photo" type="file" />
            </div>
            <div>
              <label htmlFor="zipCode">
                <small>zipCode</small>
              </label>
              <input name="zipCode" type="number" />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <Oauth name={name} />
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const userInfo = {
        email: evt.target.email.value,
        password: evt.target.password.value
      }

      if (formName === 'signup') {
        userInfo.firstName = evt.target.firstName.value
        userInfo.lastName = evt.target.lastName.value
        userInfo.phoneNumber = evt.target.phoneNumber.value
        userInfo.zipCode = evt.target.zipCode.value
        userInfo.bio = evt.target.bio.value
      }
      dispatch(auth(userInfo, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
