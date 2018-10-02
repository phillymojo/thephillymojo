import { buildSchema } from 'graphql';

const schema = `
  type Query {
    weather: Weather,
    news: [newsItem],
    movies: Movies,
    rosterplayers(team: String): Rosterplayers,
    fullgameschedule: Fullgameschedule,
  }
  type Weather {
    date: String,
    temp: String,
    text: String,
  }
  type newsItem {
    source: NewsSource,
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String,
  },
  type NewsSource {
    id: String,
    name: String,
  }
  type Movies {
    page: Int,
    total_results: Int,
    total_pages: Int,
    results: [movie]
  },
  type Rosterplayers {
    lastUpdatedOn: String,
    playerentry: [playerentry],
  },
  type Fullgameschedule {
    lastUpdatedOn: String,
    gameentry: [gameentry],
  },
  type movie {
    adult: Boolean,
    backdrop_path: String,
    genre_ids: [Int],
    id: Int,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Float,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: Float,
    vote_count: Int,
  },
  type playerentry {
    player: Player,
    team: Team,
  }
  type Player {
    ID: String,
    LastName: String,
    FirstName: String,
    JerseyNumber: String,
    Position: String,
    Height: String,
    Weight: String,
    BirthDate: String,
    Age: String,
    BirthCity: String,
    BirthCountry: String,
    IsRookie: String,
  },
  type Team {
    ID: String,
    City: String,
    Name: String,
    Abbreviation: String,
  },
  type gameentry {
    id: String,
    week: String,
    scheduleStatus: String,
    originalDate: String,
    originalTime: String,
    delayedOfPostponedReason: String,
    date: String,
    time: String,
    awayTeam: Team,
    homeTeam: Team,
    location: String,
  },
`;

export default buildSchema(schema);