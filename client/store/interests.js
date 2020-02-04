import axios from 'axios'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const GOT_INTERESTS = 'GOT_INTERESTS'
const GOT_USER_INTERESTS = 'GOT_USER_INTERESTS'
const WRITE_INTEREST = 'WRITE_INTEREST'
const GOT_NEW_INTEREST_FROM_SERVER = 'GOT_NEW_INTEREST_FROM_SERVER'
const ADDED_USER_INTEREST = 'DDED_USER_INTEREST'

/**
 * INITIAL STATE
 */
const defaultInterest = {all: [], newInterest: '', userInterests: []}

/**
 * ACTION CREATORS
 */
const gotInterests = interests => ({type: GOT_INTERESTS, interests})

const gotUserInterests = userInterests => ({GOT_USER_INTERESTS, userInterests})

const gotNewInterestFromServer = interest => ({
  GOT_NEW_INTEREST_FROM_SERVER,
  interest
})

export const writeInterest = input => {
  return {type: WRITE_INTEREST, newInterest: input}
}
/**
 * THUNK CREATORS
 */
export const getInterests = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/interests')
    dispatch(gotInterests(data))
  } catch (err) {
    console.error(err)
  }
}

export const postNewInterest = interest => {
  return async dispatch => {
    const {data} = await axios.post('/api/interests', interest)
    dispatch(gotNewInterestFromServer(data))
    socket.emit('new-interest', data)
  }
}

export const getUserInterests = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/user/${id}/interests`)

    dispatch(gotUserInterests(data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultInterest, action) {
  switch (action.type) {
    case GOT_INTERESTS:
      return {...state, all: action.interests}
    case GOT_USER_INTERESTS:
      return {...state, userInterests: action.userInterests}
    case GOT_NEW_INTEREST_FROM_SERVER:
      return {...state, all: [...state.all, action.interest]}
    case WRITE_INTEREST:
      return {...state, newInterest: action.newInterest}
    default:
      return state
  }
}
