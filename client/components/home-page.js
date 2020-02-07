import React from 'react'
import axios from 'axios'
import SearchResultsTile from './SearchResultsTile'
import {Link} from 'react-router-dom'

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      topUsers: []
    }
  }
  async componentDidMount() {
    const {data} = await axios.get('/api/users/top')

    this.setState({
      topUsers: data
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.topUsers.length &&
            this.state.topUsers.map(user => {
              return (
                <Link key={user.id} to={`/user-profile/${user.id}`}>
                  <li>{user.firstName}</li>
                </Link>
              )
            })}
        </ul>
      </div>
    )
  }
}

export default HomePage
