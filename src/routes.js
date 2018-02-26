import React from 'react';
import Morgan from './components/Morgan';
import Renata from './components/Renata';
import { Homepage } from './components/Homepage';

export const routes = [
  {
    path: "/",
    exact: true,
    component: Homepage
  },
  {
    path: "/morgan",
    component: Morgan,
  },
  {
    path: "/morgan/work",
    component: () => <div>Nike</div>
  },
  {
    path: "/morgan/school",
    component: () => <div>Penn State</div>
  },
  {
    path: "/renata",
    component: Renata
  }
]

export default routes;