import axios from 'axios'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const GOT_SERVICES = 'GOT_SERVICES'
const GOT_USER_SERVICES = 'GOT_USER_SERVICES'
const WRITE_SERVICE = 'WRITE_SERVICE'
const GOT_NEW_SERVICE_FROM_SERVER = 'GOT_NEW_SERVICE_FROM_SERVER'
const GOT_SERVICE_CATEGORIES = 'GOT_SERVICE_CATEGORIES'
const ADDED_USER_SERVICE = 'ADDED_USER_SERVICE'

/**
 * INITIAL STATE
 */
const defaultService = {
  all: [],
  newService: '',
  serviceCategories: [],
  userServices: []
}

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
const gotServiceCategories = serviceCategories => ({
  type: GOT_SERVICE_CATEGORIES,
  serviceCategories
})

const addedUserService = newUserService => ({
  type: ADDED_USER_SERVICE,
  newUserService
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

export const getServiceCategories = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/service-categories')
    dispatch(gotServiceCategories(data))
  } catch (err) {
    console.error(err)
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

export const addUserService = (id, serviceInfo) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/${id}/services`, serviceInfo)
    dispatch(addedUserService(data))
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
    case ADDED_USER_SERVICE:
      return {
        ...state,
        userServices: [...state.userServices, action.newUserService]
      }
    case GOT_NEW_SERVICE_FROM_SERVER:
      return {...state, all: [...state.all, action.service]}
    case GOT_SERVICE_CATEGORIES:
      return {...state, serviceCategories: action.serviceCategories}
    case WRITE_SERVICE:
      return {...state, newService: action.newService}
    default:
      return state
  }
}
