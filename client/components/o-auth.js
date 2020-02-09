import React from 'react'
import GoogleButton from 'react-google-button'

const Oauth = props => {
  return (
    <form method="get" action="/auth/google">
      <button id="googleButton" type="submit">
        <GoogleButton type="light" />
      </button>
    </form>
  )
}

export default Oauth
