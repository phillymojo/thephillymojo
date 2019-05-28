import axios from 'axios';
import resolvers from '../../graphql/resolvers';

let gqlPath;

// if(process.env.NODE_ENV === 'production') {
//   gqlPath = 'http://localhost/graphql';
// } else {
gqlPath = `http://localhost:${process.env.PORT || 3000}/graphql`;
// }
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

export function getWeatherSuccess(data) {
  return {
    type: 'WEATHER_FETCH_DATA_SUCCESS',
    data
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
    return axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20=%202475687&format=json')
    .then((res) => {
      dispatch(getWeatherSuccess(res.data.query.results.channel.item.condition));
    })
    // return axios.post(gqlPath, {
    //   query:
    //     `{
    //       weather {
    //         date
    //         temp
    //         text
    //       }
    //     }`
    // }
    // )
    //   .then(((response) => {
    //     dispatch(getWeatherSuccess(response.data))
    //   }))
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

    const apiKey = '6ca5b8b498352e5a5f9466a710e831e8';
    const urlBase = "https://api.themoviedb.org/3";
    const language = "en-US";
    const sort_by = "popularity.desc";
    const path = "movie/now_playing";
    const region = "US";

    const moviesUrl = `${urlBase}/${path}?api_key=${apiKey}&sort_by=${sort_by}&language=${language}&region=${region}`;
    return axios.get(moviesUrl)
      .then((res) => {
        console.log('load data from remote movies');
        dispatch(getMoviesSuccess(res.data.results));
      });
  }
}

export function getNFLSchedule() {
  return (dispatch, getState) => {
    if (getState().nflschedule.length) return false;

    dispatch(setIsLoading(true))
    const url = 'https://api.mysportsfeeds.com/v1.2/pull/nfl/2018-regular/full_game_schedule.json';
    const mysportsfeeds_apiKey = '7f8a8354-7507-4240-a27f-5a5812';

    return axios.get(url, {auth: {username: mysportsfeeds_apiKey, password: 'gocart'}})
      .then((res) => {
        console.log('loaded data from remote NFL');
        dispatch(getNFLScheduleSuccess(res.data.fullgameschedule.gameentry));
        dispatch(setIsLoading(false));
      })
  }
}

export function getNews() {
  return (dispatch, getState) => {
    if (getState().newsItems.length) return false;
    const apiKey = 'c79820853d9c4793b5dc93278e9f7861';
    const sources = [
      'google-news',
      // 'cnn',
      'espn',
      // 'msnbc',
      // 'usa-today',
      // 'reddit-r-all'
    ]
    const newsUrl = `https://newsapi.org/v2/top-headlines?sources=${sources.join(',')}&apiKey=${apiKey}`;

    return axios.get(newsUrl)
      .then((res) => {
        console.log('loaded data from remote News');
        dispatch(getNewsSuccess(res.data.articles));
      })
  }
}