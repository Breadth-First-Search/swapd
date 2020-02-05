import axios from 'axios'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const GOT_SERVICES = 'GOT_SERVICES'
const GOT_USER_SERVICES = 'GOT_USER_SERVICES'
const WRITE_SERVICE = 'WRITE_SERVICE'
const GOT_NEW_SERVICE_FROM_SERVER = 'GOT_NEW_SERVICE_FROM_SERVER'
const ADDED_USER_SERVICE = 'ADDED_USER_SERVICE'

/**
 * INITIAL STATE
 */
const defaultService = {all: [], newService: '', userServices: []}

/**
 * ACTION CREATORS
 */
const gotServices = services => ({type: GOT_SERVICES, services})

const gotUserServices = userServices => ({
  type: GOT_USER_SERVICES,
  userServices
})

const gotNewServiceFromServer = service => ({
  type: GOT_NEW_SERVICE_FROM_SERVER,
  service
})

export const writeService = input => {
  return {type: WRITE_SERVICE, newService: input}
}
/**
 * THUNK CREATORS
 */
export const getServices = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/services')
    dispatch(gotServices(data))
  } catch (err) {
    console.error(err)
  }
}

export const postNewServices = service => {
  return async dispatch => {
    const {data} = await axios.post('/api/services', service)
    dispatch(gotNewServiceFromServer(data))
    socket.emit('new-service', data)
  }
}

export const getUserServices = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}/services`)

    dispatch(gotUserServices(data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultService, action) {
  switch (action.type) {
    case GOT_SERVICES:
      return {...state, all: action.services}
    case GOT_USER_SERVICES:
      return {...state, userServices: action.userServices}
    case GOT_NEW_SERVICE_FROM_SERVER:
      return {...state, all: [...state.all, action.service]}
    case WRITE_SERVICE:
      return {...state, newService: action.newService}
    default:
      return state
  }
}
