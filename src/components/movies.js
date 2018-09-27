import React from "react"
import { connect } from "react-redux"

class Movies extends React.Component {

  render() {
    const movieData = this.props.moviesData;
    return (
      <div>
        <ul>
        {
          movieData.map((movie, i) => {
            return (
              <li key={i}>
                <div>{movie.title}</div>
                <div>{movie.overview}</div>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    moviesData: state.movies,
    isLoading: state.isLoading
  }
}

export const MoviesConnected = connect(
  mapStateToProps
)(Movies)