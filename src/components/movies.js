import React from "react"
import { connect } from "react-redux"

class Movies extends React.Component {

  render() {
    const movieList = this.props.movieList;
    const posterPath = 'https://image.tmdb.org/t/p/';
    /** "poster_sizes": ["w92","w154","w185","w342","w500","w780","original"] */
    const posterSize = 'w185';
    return (
      <div className="movie_content row no-gutters">
        {
          movieList.map((movie, i) => {
            return (
              <div className="movie_item col-12 col-lg-6" key={i}>
                <div className="row no-gutters">
                  <div className="col-4"><img src={`${posterPath}${posterSize}${movie.poster_path}`} /></div>
                  <div className="movie_item_details col-8">
                    <div className="row no-gutters">
                      <div className="movie_title col-12">{movie.title}</div>
                    </div>
                    <div className="row no-gutters">
                      <div className="movie_overview col-12">{movie.overview}</div>
                    </div>
                  </div>
                </div>
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