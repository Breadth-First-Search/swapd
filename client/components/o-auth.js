import React from 'react'

const Oauth = props => {
  const {name} = props

  return (
    <form method="get" action="/auth/google">
      <button type="submit" className="o-auth-button">
        {name === 'signup' ? 'Signin with Google' : 'Login with Google'}
      </button>
    </form>
  )
}

export default Oauth
