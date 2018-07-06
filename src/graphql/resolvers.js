import axios from 'axios';

const resolvers = {
  weather: () => {
    return axios.get('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20=%202475687&format=json')
      .then((res) => {
        return res.data.query.results.channel.item.condition;
      })
  }
}

export default resolvers;