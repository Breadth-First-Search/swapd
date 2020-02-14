import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import history from '../history'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import {getServiceCategories, gotOneCategory} from '../store/services'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    paddingLeft: 40,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#ecececde'
    },
    margin: 0,
    height: '50%',
    [theme.breakpoints.up('md')]: {
      width: 180,
      '&:focus': {
        width: 250
      }
    },
    boxShadow: '0 1px 8px 2px rgba(0, 0, 0, .1)'
  },
  search: {
    display: 'flex',
    position: 'relative',
    marginLeft: 0,
    margin: 0,
    width: '100%',
    height: 50,
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    paddingLeft: 10,
    top: -2.5,
    position: 'absolute',
    alignSelf: 'center',
    pointerEvents: 'none',
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clear: {
    backgroundColor: 'transparent',
    padding: 0,
    border: 0,
    color: 'grey',
    outline: 'none',
    '&:focus': {
      width: 20
    }
  }
}))

const Navbar = props => {
  const [search, setSearch] = useState('')
  const isLoggedIn = props.isLoggedIn
  const handleClick = props.handleClick
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleAvatarClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfile = () => {
    setAnchorEl(null)
    history.push('/user-profile')
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = evt => {
    props.gotOneCategory(evt)
  }

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
                    style={{border: '10px'}}
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    // inputProps={{'aria-label': 'search'}}
                    value={search}
                    onChange={() => setSearch(event.target.value)}
                  />
                  {search ? (
                    <button
                      className={classes.clear}
                      type="button"
                      onClick={() => setSearch('')}
                    >
                      <ClearIcon />
                    </button>
                  ) : null}
                </div>
              </form>
            </div>

            <div className={classes.root}>
              <Button
                style={{backgroundColor: '#fff', outlineColor: '#25665C'}}
                size="medium"
                color="primary"
              >
                <Link
                  style={{color: '#25665C', fontWeight: 'bold'}}
                  to="/swaps"
                >
                  Messages
                </Link>
              </Button>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleAvatarClick}
              >
                <Avatar alt="User" src={props.user.photo} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem style={{fontSize: '15px'}} onClick={handleProfile}>
                  Profile
                </MenuItem>
                <MenuItem style={{fontSize: '15px'}} onClick={handleClick}>
                  Logout
                </MenuItem>
              </Menu>
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
              {/* <datalist id="serviceCategories">
                {serviceCategories.map(sc => (
                  <Link
                    key={sc.id}
                    to="/selectedCategory"
                    onClick={handleSelect}
                  >
                    <option value={sc.name} />
                  </Link>
                ))}
              </datalist> */}

              <Button
                // style={{backgroundColor: '#fff', outlineColor: '#25665C'}}
                size="medium"
                color="primary"
              >
                <Link
                  style={{color: '#25665C', fontWeight: 'bold'}}
                  to="/login"
                >
                  Login
                </Link>
              </Button>
              <Button
                // style={{backgroundColor: '#fff', outlineColor: '#25665C'}}
                size="medium"
                color="primary"
              >
                <Link
                  style={{color: '#25665C', fontWeight: 'bold'}}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    serviceCategories: state.serviceCategories
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getServiceCategories: () => dispatch(getServiceCategories()),
    gotOneCategory: () => dispatch(gotOneCategory())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
  // handleSelect: PropTypes.func.isRequired
}
