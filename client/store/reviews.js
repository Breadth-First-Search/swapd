import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_UNREVIEWED_SWAPS = 'GOT_UNREVIEWED_SWAPS'
const GOT_UNREVIEWED_SERVICES = 'GOT_UNREVIEWED_SERVICES'
const GOT_REVIEW = 'GOT_REVIEW'
const CLEAR_UNREVIEWED_SERVICE = 'CLEAR_UNREVIEWED_SERVICE'

/**
 * INITIAL STATE
 */
const defaultReviews = {
  unreviewedServices: [],
  unreviewedSwaps: [],
  review: {}
}

/**
 * ACTION CREATORS
 */
const gotUnreviewedSwaps = swaps => ({
  type: GOT_UNREVIEWED_SWAPS,
  swaps
})

const gotUnreviewedServices = services => ({
  type: GOT_UNREVIEWED_SERVICES,
  services
})

const gotReview = review => ({
  type: GOT_REVIEW,
  review
})

const clearUnreviewedService = arr => ({
  type: CLEAR_UNREVIEWED_SERVICE,
  arr
})

/**
 * THUNK CREATORS
 */

export const updateReviewStatus = (swapId, userId) => async dispatch => {
  try {
    await axios.put(`/api/swaps/reviews/${swapId}`, {userId})
    dispatch(clearUnreviewedService([]))
  } catch (err) {
    console.error(err)
  }
}

export const submitReview = review => async dispatch => {
  try {
    const {data} = await axios.post('/api/reviews', review)
    dispatch(gotReview(data))
  } catch (err) {
    console.error(err)
  }
}

export const getUnreviewedSwaps = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/reviews/unreviewedSwaps/${id}`)
    dispatch(gotUnreviewedSwaps(data))
  } catch (err) {
    console.error(err)
  }
}
export const getUnreviewedServices = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/reviews/unreviewedServices/${id}`)
    dispatch(gotUnreviewedServices(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultReviews, action) {
  switch (action.type) {
    case GOT_UNREVIEWED_SWAPS:
      return {...state, unreviewedSwaps: action.swaps}
    case GOT_UNREVIEWED_SERVICES:
      return {...state, unreviewedServices: action.services}
    case GOT_REVIEW:
      return {...state, review: action.review}
    case CLEAR_UNREVIEWED_SERVICE:
      return {...state, unreviewedServices: action.arr}
    default:
      return state
  }
}
