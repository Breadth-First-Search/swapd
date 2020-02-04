import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import history from '../history'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
    display: 'flex'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  }
}))

const Navbar = props => {
  const [search, setSearch] = useState('')
  const isLoggedIn = props.isLoggedIn
  const handleClick = props.handleClick
  const classes = useStyles()

  console.log(props.user.id)

  return (
    <div>
      <nav>
        {/* The navbar will show these links after you log in */}
        {isLoggedIn ? (
          <div id="navbarcontainer">
            <div id="logocontainer">
              <Link to="/">
                <img id="swapdlogo" src="/swapd.png" />
              </Link>
              <form
                onSubmit={() =>
                  history.push(`/search/${search}/?searcherId=${props.user.id}`)
                }
              >
                <InputBase
                  placeholder="Search…"
                  className={classes.inputInput}
                  inputProps={{'aria-label': 'search'}}
                  value={search}
                  onChange={() => setSearch(event.target.value)}
                />
              </form>
            </div>

            <div className={classes.root}>
              <Button
                style={{maxHeight: '50px'}}
                size="small"
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                <Link to="/">Logout</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div id="navbarcontainer">
            {/* The navbar will show these links before you log in */}

            <div id="logocontainer">
              <Link to="/">
                <img id="swapdlogo" src="/swapd.png" />
              </Link>
              <form
                onSubmit={() =>
                  history.push(`/search/${search}/?searcherId=${props.user.id}`)
                }
              >
                <InputBase
                  placeholder="Search…"
                  className={classes.inputInput}
                  inputProps={{'aria-label': 'search'}}
                  value={search}
                  onChange={() => setSearch(event.target.value)}
                />
              </form>
            </div>

            <div className={classes.root}>
              <Button
                style={{maxHeight: '50px'}}
                size="small"
                variant="contained"
                color="primary"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                style={{maxHeight: '50px'}}
                size="small"
                variant="contained"
                color="primary"
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
