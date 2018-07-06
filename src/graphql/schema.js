import { buildSchema } from 'graphql';

const schema = `
  type Query {
    weather: Weather,
  }
  type Weather {
    date: String,
    temp: String,
    text: String,
  }
`;

export default buildSchema(schema);