import React from 'react';
import Loadable from 'react-loadable';

import { fetchChuckNorrisQuote, getNews, getMovies, getNFLSchedule } from './store/actions';

// import { Homepage } from './components/Homepage';
import UserList from './components/UserList';
import { User } from './components/User';
import { Info } from './components/Info';
import { NewsConnected } from './components/news';
import { MoviesConnected } from './components/movies';
import { NFLConnected } from './components/nfl';

function Loading() {
  return <span>Loading...</span>;
}

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "Homepage" */'./components/Homepage'),
  loading: Loading
});

export const routes = [
  {
    path: "/",
    exact: true,
    component: Homepage,
  },
  {
    path: "/user",
    component: UserList,
    routes: [
      {
        path: "/user/:user",
        component: User,
        loadData: () => fetchChuckNorrisQuote(),
        routes: [
          {
            path: "/user/:user/:info",
            component: Info,
          },
        ]
      },
    ]
  },
  {
    path: "/news",
    component: NewsConnected,
    loadData: () => getNews(),
  },
  {
    path: "/movies",
    component: MoviesConnected,
    loadData: () => getMovies(),
  },
  {
    path: "/nfl",
    component: NFLConnected,
    loadData: () => getNFLSchedule(),
  },
]

export default routes;