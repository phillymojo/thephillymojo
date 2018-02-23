import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import { Homepage } from './Homepage';

export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Homepage} />
    </Switch>
  </Layout>
);

export default App;