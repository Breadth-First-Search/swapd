import React from 'react'
import axios from 'axios'
import SearchResultsTile from './SearchResultsTile'
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
    console.log(this.state.topUsers)
    return (
      <div>
        <ul>
          {this.state.topUsers.length &&
            this.state.topUsers.map((user, idx) => {
              return <li key={idx}>{user.firstName}</li>
            })}
        </ul>
      </div>
    )
  }
}

export default HomePage
