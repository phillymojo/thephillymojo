import React from 'react';
import { withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

/** This HOC is used on the client side to detect if the location is different, and 
 * fire the route's loadData function if this is a new route that needs data. This will update
 * the store which will in turn trigger the change in the cooresponding component.
*/

export class DataLoader extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname != this.props.location.pathname) {
      matchRoutes(this.props.routes, nextProps.location.pathname).forEach(({ route, match }) => {
        if (route.loadData) this.props.dispatch(route.loadData(match))
      })
    }
  }
  render() {
    return this.props.children
  }
}

export const RouteDataLoader = withRouter(DataLoader);
