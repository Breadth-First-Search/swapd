import io from 'socket.io-client'
import store from './store'
import {gotNewInterestFromServer} from './store/interests'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('new-interest', interest => {
  store.dispatch(gotNewInterestFromServer(interest))
})

export default socket
