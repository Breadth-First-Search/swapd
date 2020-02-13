import io from 'socket.io-client'
import store from './store'
import {gotNewInterestFromServer} from './store/interests'
import {gotNewMessageFromServer} from './store/messages'
// import {gotNewOfferFromServer} from './store/offers'

const socket = io(window.location.origin) //const socket = io('/test')

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('new-interest', interest => {
  store.dispatch(gotNewInterestFromServer(interest))
})

// receive message
socket.on('new-message', message => {
  console.log(message)
  store.dispatch(gotNewMessageFromServer(message))
})

// socket.on('new-offer', offer => {
// 	store.dispatch(gotNewOfferFromServer(offer))
// })

export default socket
