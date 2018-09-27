import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import configureStore from './store/configureStore';
import { Layout, LayoutConnected } from './components/Layout';
import routes from './routes';
import { RouteDataLoader } from './route-data-loader';

const store = configureStore(window.__PRELOADED_STATE__);

window.onload = () => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <RouteDataLoader routes={routes} dispatch={store.dispatch}>
          <Layout>
            {renderRoutes(routes)}
          </Layout>
        </RouteDataLoader>
      </BrowserRouter>
    </Provider>,
    document.getElementById('main')
  );
};