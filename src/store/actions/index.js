import axios from 'axios';

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

export function getNasaSuccess(data) {
  return {
    type: 'NASA_FETCH_SUCCESS',
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
    return axios.post('http://localhost:3000/graphql', {
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
        // console.log(response.data.query.results.channel.item.condition);
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

export function getNFLTeamRoster(teamName = 'phi') {
  return (dispatch) => {
    return axios.get(`http://api.suredbits.com/nfl/v0/team/${teamName}/roster`)
      .then((response) => {
        console.log(response)
      });
  }
}

export function getNasa() {
  return dispatch => {
    // dispatch(setIsLoading(true))
    return axios.post('http://localhost:3000/graphql', {
      query: `{
        nasa {
          title
          explanation
          url
          date
        }
      }
      `
    }).then((response) => {
      dispatch(getNasaSuccess(response.data));
      // dispatch(setIsLoading(false));
    })
  }
}

export function getNews() {
  return dispatch => {
    // dispatch(setIsLoading(true))
    return axios.post('http://localhost:3000/graphql', {
      query: '{ news { author,title,description,url,urlToImage,publishedAt } }'
    }).then((response) => {
      dispatch(getNewsSuccess(response.data));
      // dispatch(setIsLoading(false));
    })
  }
}