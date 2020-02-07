import axios from 'axios'
import history from '../history'
import {getUserServices} from './services'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_SELECTED_USER = 'GET_SELECTED_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getSelectedUser = selectedUser => ({
  type: GET_SELECTED_USER,
  selectedUser
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    dispatch(getUserServices(res.data.id))
  } catch (err) {
    console.error(err)
  }
}

export const editUser = (id, edits) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${id}`, edits)
    dispatch(getUser(data))
    dispatch(getUserServices(this.props.user.id))
  } catch (err) {
    console.error(err)
  }
}

export const loadSelectedUser = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(getSelectedUser(data))
  } catch (err) {
    console.error(err)
  }
}

export function auth(userInfo, method) {
  return async dispatch => {
    let res
    try {
      res = await axios.post(`/auth/${method}`, userInfo)
    } catch (authError) {
      return dispatch(getUser({error: authError}))
    }

    try {
      dispatch(getUser(res.data))
      history.push('/home')
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr)
    }
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

export function selectedUser(state = {}, action) {
  switch (action.type) {
    case GET_SELECTED_USER:
      return action.selectedUser
    default:
      return state
  }
}
