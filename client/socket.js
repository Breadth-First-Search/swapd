import io from 'socket.io-client'
import store from './store'
import {gotNewMessageFromServer} from './store/interests'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('new-interest', interest => {
  store.dispatch(gotNewMessageFromServer(interest))
})

export default socket
