import axios from 'axios'
import socket from '../socket'

export const GET_ALL_SWAPS = 'GOT_ALL_SWAPS'

export const getAllSwaps = swaps => {
  return {
    type: GET_ALL_SWAPS,
    swaps
  }
}

export const loadAllSwaps = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/swaps/${userId}`)
    dispatch(getAllSwaps(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_SWAPS:
      return action.swaps
    default:
      return state
  }
}
