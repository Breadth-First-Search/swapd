import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user, {selectedUser} from './user'
import interests from './interests'
import services from './services'
import swaps from './swaps'
import {
  newEntryReducer as newEntry,
  messagesReducer as messages
} from './messages'

const reducer = combineReducers({
  user,
  selectedUser,
  interests,
  services,
  swaps,
  messages,
  newEntry
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
