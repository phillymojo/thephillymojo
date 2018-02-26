import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
// import { Homepage } from './Homepage';
// import { Morgan } from './Morgan';
// import { Renata } from './Renata';

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