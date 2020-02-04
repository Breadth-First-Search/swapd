import React from 'react'

export default class SearchResultsTile extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {}

  render() {
    let result = this.props.result
    console.log(result)
    return (
      <div>
        <img src={result.photo} />
        <h3>
          {result.firstName} {result.lastName}
        </h3>
        <h4>Overall Rating: {result.overallRating}</h4>
        <h4>Service Rating: {result.services[0].serviceRating}</h4>
      </div>
    )
  }
}
