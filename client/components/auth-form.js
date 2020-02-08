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

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Swapd
      </Link>{' '}
      2020.
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  labelRoot: {
    fontSize: 16,
    top: 16
  },
  grid: {
    padding: 0
  },
  input: {
    alignSelf: 'center'
  }
}))

export default function SignUp(props) {
  const classes = useStyles()
  console.log(props)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography style={{fontSize: '36px'}} component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={props.handleSubmit}
          name={name}
        >
          <Grid container spacing={2}>
            <Grid style={{paddingBottom: 0, paddingTop: 0}} item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                InputProps={{className: classes.input}}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused
                  }
                }}
              />
            </Grid>
            <Grid style={{paddingBottom: 0, paddingTop: 0}} item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth={true}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                InputProps={{className: classes.input}}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused
                  }
                }}
              />
            </Grid>
            <Grid style={{paddingBottom: 0, paddingTop: 0}} item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputProps={{className: classes.input}}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused
                  }
                }}
              />
            </Grid>
            <Grid style={{paddingBottom: 0, paddingTop: 0}} item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{className: classes.input}}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused
                  }
                }}
              />
            </Grid>
            <Grid style={{paddingBottom: 0, paddingTop: 0}} item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                name="phone"
                label="Phone Number"
                type="phone"
                id="phone"
                autoComplete="phone"
                InputProps={{className: classes.input}}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused
                  }
                }}
              />
            </Grid>
            <Grid style={{paddingBottom: 0, paddingTop: 0}} item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                name="zipcode"
                label="Zip Code"
                type="zipcode"
                id="zipcode"
                autoComplete="zipcode"
                InputProps={{className: classes.input}}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused
                  }
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
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
export const Signup = connect(mapSignup, mapDispatch)(SignUp)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
