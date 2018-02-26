import React from 'react';
import { Route, Switch, Link} from 'react-router-dom';
import { Morgan } from './Morgan';


export const Homepage = () => (
  <div>
    <div>Homepage</div>
    <Link to={`/morgan`}>Morgan</Link>
    <Link to={`/renata`}>Renata</Link>
  </div>
)