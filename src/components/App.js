import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import { Homepage } from './Homepage';
import { Morgan } from './Morgan';
import { Renata } from './Renata';

export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/morgan" component={Morgan} />
      <Route exact path="/renata" component={Renata} />
    </Switch>
  </Layout>
);

export default App;