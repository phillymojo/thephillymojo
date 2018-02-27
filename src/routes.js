import React from 'react';
import { Homepage } from './components/Homepage';

import { User } from './components/User';
import { Info } from './components/Info';

export const routes = [
  {
    path: "/",
    exact: true,
    component: Homepage
  },
  {
    path: "/:user",
    component: User,
  },
  {
    path: "/:user/:info",
    component: Info,
  },
]

export default routes;