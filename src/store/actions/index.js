import axios from 'axios';

const gqlPath = `http://localhost:${process.env.PORT || 3000}/graphql`;

export function setIsLoading(isLoading) {
  return {
    type: 'IS_LOADING',
    isLoading
  }
}

export function quoteFetchDataSuccess(quote) {
  return {
    type: 'QUOTE_FETCH_DATA_SUCCESS',
    quote
  }
}

export function getWeatherSuccess(weatherData) {
  return {
    type: 'WEATHER_FETCH_DATA_SUCCESS',
    weatherData
  }
}

export function getInspirationalQuoteSuccess(inspirationalQuoteData) {
  return {
    type: 'INSPIRATIONAL_QUOTE_FETCH_DATA_SUCCESS',
    inspirationalQuoteData
  }
}

export function getNewsSuccess(data) {
  return {
    type: 'NEWS_FETCH_SUCCESS',
    data
  }
}

export function getMoviesSuccess(data) {
  return {
    type: 'MOVIES_FETCH_SUCCESS',
    data
  }
}

export function getNFLScheduleSuccess(data) {
  return {
    type: 'NFLSCHEDULE_FETCH_SUCCESS',
    data
  }
}

export function fetchChuckNorrisQuote() {
  return (dispatch) => {
    return axios.get('http://api.icndb.com/jokes/random')
      .then(response => {
        dispatch(quoteFetchDataSuccess(response.data.value.joke));
      });
  }
}

export function getWeather() {
  return (dispatch) => {
    return axios.post(gqlPath, {
      query:
        `{
          weather {
            date
            temp
            text
          }
        }`
    }
    )
      .then(((response) => {
        dispatch(getWeatherSuccess(response.data))
      }))
  }
}

export function getInspirationalQuote() {
  return (dispatch) => {
    return axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
      .then((response) => {
        dispatch(getInspirationalQuoteSuccess(response.data))
      })
  }
}

export function getMovies() {
  return (dispatch, getState) => {
    if (getState().movies.length) return false;

    return axios.post(gqlPath, {
      query: `{
        movies {
          page
          results {
            vote_count
            id
            video
            vote_average
            title
            popularity
            poster_path
            original_language
            original_title
            backdrop_path
            adult
            overview
            release_date
            genre_ids
          }
        }
      }`
    }).then((response) => {
      dispatch(getMoviesSuccess(response.data));
    })
  }
}

export function getNFLSchedule() {
  return (dispatch, getState) => {
    if (getState().nflschedule.isLoaded) return false;

    dispatch(setIsLoading(true))
    return axios.post(gqlPath, {
      query: `{
        fullgameschedule {
          lastUpdatedOn
          gameentry {
            week
            date
            time
            homeTeam {
              Name
            }
            awayTeam {
              Name
            }
            location
          }
        }
      }`
    }).then((response) => {
      // console.log(response.data.data.fullgameschedule.gameentry);
      dispatch(getNFLScheduleSuccess(response.data.data.fullgameschedule.gameentry));
      dispatch(setIsLoading(false));
    })
  }
}

export function getNews() {
  return (dispatch, getState) => {
    if (getState().newsItems.length) return false;

    dispatch(setIsLoading(true))
    return axios.post(gqlPath, {
      query: '{ news { author,title,description,url,urlToImage,publishedAt } }'
    }).then((response) => {
      dispatch(getNewsSuccess(response.data));
      dispatch(setIsLoading(false));
    })
  }
}