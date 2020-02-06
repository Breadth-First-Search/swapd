import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import SearchResultsTile from './SearchResultsTile'

class SearchResults extends React.Component {
  constructor() {
    super()
    this.state = {
      results: [],
      isLoading: true
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
        results: results.data,
        isLoading: false
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    let results = this.state.results

    return !this.state.isLoading ? (
      <div className="searchResultsContainer">
        {results.length === 0 ? (
          <h1>No Results</h1>
        ) : (
          results.map((result, i) => {
            return <SearchResultsTile result={result} key={i} />
          })
        )}
      </div>
    ) : null
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
