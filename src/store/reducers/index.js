import { combineReducers } from 'redux';

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

export default combineReducers({
  chuckNorrisQuote,
  weather,
  inspirationalQuote
});