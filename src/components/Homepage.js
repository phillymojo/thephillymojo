import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Morgan } from './Morgan';

export const Homepage = () => (
  <div>
    <div>Homepage</div>
    <Switch>
      <Route exact path="/morgan" component={Morgan} />
    </Switch>
  </div>
)