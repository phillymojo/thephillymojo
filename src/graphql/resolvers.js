import axios from 'axios';

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
        return res.data.articles
      })
  },
  nasa: () => {
    const apiKey = 'gp7C4VrsB3PRaUhpAlSiJMDPYrEkvwc4LzHQ60K2';
    const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    return axios.get(nasaUrl)
      .then((res) => {
        return res.data
      })
  },  
}

export default resolvers;