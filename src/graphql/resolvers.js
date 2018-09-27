import axios from 'axios';
import { getFormatedDate } from '../utils';

const mysportsfeeds_apiKey = '7f8a8354-7507-4240-a27f-5a5812';

const resolvers = {
  weather: () => {
    return axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20=%202475687&format=json')
      .then((res) => {
        return res.data.query.results.channel.item.condition;
      })
  },
  news: () => {
    const apiKey = 'c79820853d9c4793b5dc93278e9f7861';
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    return axios.get(newsUrl)
      .then((res) => {
        console.log('loaded data from remote News');
        return res.data.articles
      })
  },

  movies: () => {
    const apiKey = '6ca5b8b498352e5a5f9466a710e831e8';
    const urlBase = "https://api.themoviedb.org/3";
    const primary_release_date = {
      gte: "2014-09-15",
      lte: "2014-10-22&",
    }
    const language = "en-US";
    const sort_by = "popularity.desc";
    const path = "movie/now_playing";
    const region = "US";

    const moviesUrl = `${urlBase}/${path}?api_key=${apiKey}&language=${language}&region=${region}`;
    return axios.get(moviesUrl)
      .then((res) => {
        console.log('load data from remote movies');
        return res.data;
      });
  },
  
  rosterplayers: (args) => {
    const urlBase = 'https://api.mysportsfeeds.com/v1.2/pull/nfl/2018-regular/roster_players.json';
    const team = args.team || 'phi';
    const fordate = getFormatedDate();

    const url = `${urlBase}?fordate=${fordate}&team=${team}`;
    
    return axios.get(url, {auth: {username: mysportsfeeds_apiKey, password: 'gocart'}})
      .then((res) => {
        return res.data.rosterplayers
      })
  },

  fullgameschedule: () => {
    const url = 'https://api.mysportsfeeds.com/v1.2/pull/nfl/2018-regular/full_game_schedule.json';

    return axios.get(url, {auth: {username: mysportsfeeds_apiKey, password: 'gocart'}})
      .then((res) => {
        console.log('loaded data from remote NFL');
        return res.data.fullgameschedule;
      })
  },
}

export default resolvers;