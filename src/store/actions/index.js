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