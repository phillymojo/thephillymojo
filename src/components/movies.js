import React from "react"
import { connect } from "react-redux"

class Movies extends React.Component {

  render() {
    const movieList = this.props.movieList;
    const posterPath = 'https://image.tmdb.org/t/p/';
    /** "poster_sizes": ["w92","w154","w185","w342","w500","w780","original"] */
    const posterSize = 'w154';
    return (
      <div className={'movie_content'}>
        {
          movieList.map((movie, i) => {
            return (
              <div className={'movie_item'} key={i}>
                <div className={'movie_item_details'}>
                  <img src={`${posterPath}${posterSize}${movie.poster_path}`} />
                  <span className={'movie_overview'}>{movie.overview}</span>
                </div>
                <div className={'movie_title'}>{movie.title}</div>
              </div>
            )
          })
        }
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