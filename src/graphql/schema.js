import { buildSchema } from 'graphql';

const schema = `
  type Query {
    weather: Weather,
    news: [newsItem],
    nasa: Nasa,
  }
  type Weather {
    date: String,
    temp: String,
    text: String,
  }
  type newsItem {
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: String
  },
  type Nasa {
    copyright: String,
    date: String,
    explanation: String,
    hdurl: String,
    media_type: String,
    service_version: String,
    title: String,
    url: String,
  },
`;

export default buildSchema(schema);