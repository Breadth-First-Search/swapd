import React from 'react'

const Oauth = () => {
  return (
    <form method="get" action="/auth/google">
      <button type="submit" className="o-auth-button">
        Login with Google
      </button>
    </form>
  )
}

export default Oauth
