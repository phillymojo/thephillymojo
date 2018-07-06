import React from 'react';
import { Homepage } from './components/Homepage';

import UserList from './components/UserList';
import { User } from './components/User';
import { Info } from './components/Info';
import { fetchChuckNorrisQuote } from './store/actions';

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
]

export default routes;