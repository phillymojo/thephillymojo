import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';

import { routes } from '../routes';

export const App = () => (
  <Layout>
    {routes.map((route,index) => (
        <Route
          key={index} 
          {...route}
        />      
      )
    )}
  </Layout>
);

export default App;