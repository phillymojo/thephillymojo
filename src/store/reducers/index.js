import { combineReducers } from 'redux';

export function isLoading(state=false, action) {
  switch(action.type) {
    case 'IS_LOADING':
      return action.isLoading
    default:
      return state;
  }
}

export function chuckNorrisQuote(state=[], action) {
  switch(action.type) {
    case 'QUOTE_FETCH_DATA_SUCCESS':
    console.log(action.quote);
      return action.quote;
    default:
      return state;
  }
}

export function weather(state=[], action) {
  switch(action.type) {
    case 'WEATHER_FETCH_DATA_SUCCESS':
      return action.weatherData.data.weather;
    default:
      return state;
  }
}

export function inspirationalQuote(state=[], action) {
  switch(action.type) {
    case 'INSPIRATIONAL_QUOTE_FETCH_DATA_SUCCESS':
      return action.inspirationalQuoteData;
    default:
      return state;
  }
}

export function newsItems(state=[], action) {
  switch(action.type) {
    case 'NEWS_FETCH_SUCCESS':
      return action.data.data.news;
    default:
      return state;
  }
}

export function movies(state=[], action) {
  switch(action.type) {
    case 'MOVIES_FETCH_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function nflschedule(state=[], action) {
  switch(action.type) {
    case 'NFLSCHEDULE_FETCH_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export default combineReducers({
  isLoading,
  chuckNorrisQuote,
  weather,
  inspirationalQuote,
  newsItems,
  movies,
  nflschedule,
});