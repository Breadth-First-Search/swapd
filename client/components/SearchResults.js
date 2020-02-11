import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import SearchResultsTile from './SearchResultsTile'
import {NavLink} from 'react-router-dom'
import history from '../history'

class SearchResults extends React.Component {
  constructor() {
    super()
    this.state = {
      results: [],
      isLoading: true
    }
    this.loadResults = this.loadResults.bind(this)
  }

  async loadResults(searchString = this.props.match.params.serviceName) {
    try {
      let results = await axios.get(
        `/api/users/services/${searchString}/?searcherId=${this.props.user.id}`
      )
      this.setState({
        results: results.data,
        isLoading: false
      })
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    // console.log(this.props.user.id)
    await this.loadResults()
  }

  render() {
    let results = this.state.results

    let extraInfo = results.pop()
    console.log(extraInfo)

    return !this.state.isLoading ? (
      <div className="searchResultsContainer">
        {extraInfo && (
          <h3>Showing results for closest match to: "{extraInfo[0]}"</h3>
        )}
        {extraInfo && (
          <h4 onClick={() => this.loadResults(extraInfo[1])}>
            Show results instead for: "{extraInfo[1]}"?
          </h4>
        )}
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
