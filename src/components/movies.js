import React from "react"
import { connect } from "react-redux"

class Movies extends React.Component {

  render() {
    const movieList = this.props.movieList;
    return (
      <div>
        <ul>
        {
          movieList.map((movie, i) => {
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
    movieList: state.movies,
    isLoading: state.isLoading
  }
}

export const MoviesConnected = connect(
  mapStateToProps
)(Movies)