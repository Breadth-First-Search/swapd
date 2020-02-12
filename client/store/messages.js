import axios from 'axios'
import socket from '../socket'

const initialState = {messages: [], newEntry: ''}

//action types
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER'
const WRITE_MESSAGE = 'WRITE_MESSAGE'
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER'

//action creators
export const gotMessagesFromServer = messages => {
  return {type: GOT_MESSAGES_FROM_SERVER, messages}
}

export const writeMessage = input => {
  return {type: WRITE_MESSAGE, newEntry: input}
}

export const gotNewMessageFromServer = message => {
  return {type: GOT_NEW_MESSAGE_FROM_SERVER, message}
}

//thunks
export const getMessagesFromServer = swapId => {
  return async dispatch => {
    const response = await axios.get(`/api/messages/swap/${swapId}`)
    const messages = response.data
    const action = gotMessagesFromServer(messages)
    dispatch(action)
  }
}

export const postNewMessage = message => {
  return async dispatch => {
    const response = await axios.post('/api/messages', message)
    const newMessage = response.data

    const action = getMessagesFromServer(message.swapId)
    dispatch(action)

    socket.emit('new-message', newMessage)
  }
}

export const postNewOffer = (offer, prevId, selectedServiceId) => {
  return async dispatch => {
    const updatedOffer = await axios.put(`/api/messages/${prevId}`)
    const updateSwap = await axios.put(
      `/api/swaps/${offer.swapId}/services/${selectedServiceId}`
    )

    const response = await axios.post('/api/messages', offer)
    const newOffer = response.data

    dispatch(getMessagesFromServer(offer.swapId)).then(() => {
      socket.emit('new-message', newOffer)
    })
  }
}

//reducers
export function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return action.messages
    case GOT_NEW_MESSAGE_FROM_SERVER:
      let newState = state.filter(
        message =>
          message.type === 'MESSAGE' ||
          message.type === 'CURRENT_OFFER' ||
          message.type === 'CONFIRMED_OFFER'
      )
      newState.push(action.message)
      return newState

    default:
      return state
  }
}

export function newEntryReducer(state = initialState.newEntry, action) {
  switch (action.type) {
    case WRITE_MESSAGE:
      return action.newEntry
    default:
      return state
  }
}
