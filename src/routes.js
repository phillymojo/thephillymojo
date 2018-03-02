import React from 'react';
import { Homepage } from './components/Homepage';

import UserList from './components/UserList';
import { User } from './components/User';
import { Info } from './components/Info';

export const routes = [
  {
    path: "/",
    exact: true,
    component: Homepage
  },
  {
    path: "/user",
    component: UserList,
  },
  {
    path: "/user/:user",
    component: User,
  },
  {
    path: "/user/:user/:info",
    component: Info,
  },
]

export default routes;