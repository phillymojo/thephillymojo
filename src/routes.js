import React from 'react';
import { Homepage } from './components/Homepage';

import UserList from './components/UserList';
import { User } from './components/User';
import { Info } from './components/Info';
import { fetchChuckNorrisQuote, getNews, getNasa } from './store/actions';
import { NewsConnected } from './components/news';
import { NasaConnected } from './components/nasa';

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
        path: "/user/news",
        component: NewsConnected,
        loadData: () => getNews(),
      },
      {
        path: "/user/nasa",
        component: NasaConnected,
        loadData: () => getNasa(),
      },
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
]

export default routes;