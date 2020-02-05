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
    display: 'flex',
    alignSelf: 'center',
    color: 'white'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    paddingLeft: 30,
    margin: 0,
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#ecececde'
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    margin: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    top: 5,
    position: 'absolute',
    pointerEvents: 'none',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
}))

const Navbar = props => {
  const [search, setSearch] = useState('')
  const isLoggedIn = props.isLoggedIn
  const handleClick = props.handleClick
  const classes = useStyles()

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
              <form onSubmit={() => history.push(`/search/${search}`)}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{'aria-label': 'search'}}
                    value={search}
                    onChange={() => setSearch(event.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className={classes.root}>
              <Button
                style={{backgroundColor: '#25665C'}}
                size="medium"
                variant="contained"
                color="primary"
              >
                <Link to="/swaps">Messages</Link>
              </Button>
              <Button
                style={{backgroundColor: '#25665C'}}
                size="medium"
                variant="contained"
                color="primary"
              >
                <Link to="/user-profile">User Profile</Link>
              </Button>
              <Button
                style={{backgroundColor: '#25665C'}}
                size="medium"
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

              {/*Guest should not be able to search */}
              {/* <form
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
              </form> */}
            </div>

            <div className={classes.root}>
              <Button
                style={{backgroundColor: '#25665C'}}
                size="medium"
                variant="contained"
                color="primary"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                style={{backgroundColor: '#25665C'}}
                size="medium"
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
