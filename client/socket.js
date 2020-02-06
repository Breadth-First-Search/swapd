import io from 'socket.io-client'
import store from './store'
import {gotNewInterestFromServer} from './store/interests'
import {gotNewMessageFromServer} from './store/messages'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-interest', interest => {
  store.dispatch(gotNewInterestFromServer(interest))
})

// send message

// receive message
socket.on('new-message', message => {
  store.dispatch(gotNewMessageFromServer(message))
})

export default socket
