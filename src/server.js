/* eslint no-console: "off" */

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import graphqlHTTP from 'express-graphql';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from './routes';
import { Layout } from './components/Layout';
import { getWeather, getInspirationalQuote, getNews } from './store/actions';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

import configureStore from './store/configureStore';

const app = new Express();
const server = new Server(app);


// use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.use('/graphql', graphqlHTTP({ schema, rootValue: resolvers, graphiql: true}));

// universal routing and rendering
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

  const store = configureStore();
  const context = {};
  const { url } = req;

  // ## pre-load data for all the routes that match, so that the store has proper data before rendering on the server
  const promises = matchRoutes(routes, url).map(({ route, match }) => {
    if (route.loadData) return store.dispatch(route.loadData(match));
  });
  // ##

  // ## always make sure this data is pre-loaded before rendering on server
  const preloadedDataActions = [];
  preloadedDataActions.push(getWeather);
  preloadedDataActions.push(getInspirationalQuote);
  // preloadedDataActions.push(getNews);

  preloadedDataActions.map((action) => {
    return promises.push(store.dispatch(action()));
  })
  // ##

  Promise.all(promises).then(() => {
    markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <Layout>
            {renderRoutes(routes)}
          </Layout>
        </StaticRouter>
      </Provider>
    );
    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }

    const state = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())};</script>`
    return res.status(status).render('index', { markup, state });
  })
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      ::Server running on http://localhost:${port} [${env}]::
    `);
});
