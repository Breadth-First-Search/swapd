import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import SearchResultsTile from './SearchResultsTile'

class SearchResults extends React.Component {
  constructor() {
    super()
    this.state = {
      results: []
    }
  }

  async componentDidMount() {
    // console.log(this.props.user.id)
    try {
      let results = await axios.get(
        `/api/users/services/${
          this.props.match.params.serviceName
        }/?searcherId=${this.props.user.id}`
      )
      this.setState({
        results: results.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    let results = this.state.results

    return (
      <div>
        {results.length === 0 ? (
          <h1>No Results</h1>
        ) : (
          results.map((result, i) => {
            return <SearchResultsTile result={result} key={i} />
          })
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
