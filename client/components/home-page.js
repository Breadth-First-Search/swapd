import React from 'react'
import axios from 'axios'
import SearchResultsTile from './SearchResultsTile'
class HomePage extends React.Component {
  constructor() {
    super()
    this.state = []
  }
  async componentDidMount() {
    const {data} = await axios.get('/api/users/top')

    this.setState(data)
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.map(user, idx => {
            return (
              <li key={idx}>
                <SearchResultsTile result={user} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default HomePage
