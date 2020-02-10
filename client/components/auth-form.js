import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {auth} from '../store'
import Oauth from './o-auth'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{marginTop: '50px'}}
    >
      Copyright © Swapd 2020.
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'centerr'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  labelRoot: {
    fontSize: 16,
    top: 16
  },
  input: {
    alignSelf: 'center'
  }
}))

function AuthForm(props) {
  const classes = useStyles()
  const {name, handleSubmit, error} = props
  const [isLoading, setLoading] = useState(true)

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography style={{fontSize: '36px'}} component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} name={name}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{className: classes.input}}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                  focused: classes.labelFocused
                }
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {error && error.response && <div> {error.response.data} </div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container spacing={2}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password? Too Bad.
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            {/* <Box mt={5}> */}
            {/* </Box> */}
          </form>
          <Oauth name={props.name} />
          <Copyright />
        </div>
      </Grid>
    </Grid>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    isLoggedIn: !!state.user.id,
    user: state.user
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
      dispatch(auth(userInfo, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
/**
 * PROP TYPES
 */
// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }
