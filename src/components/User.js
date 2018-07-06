import React from 'react';
import { connect } from 'react-redux';
import { PageNotFound } from './PageNotFound';
import data from '../data';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { WeatherConnected } from './weather';

export const User = ({ match, route }) => {
  const user = match.params.user;

  if (!data[user]) { return <PageNotFound /> }

  return (
    <div className="user">
        <h1 className="display-3"><Link to={`/user/${user}`}>{data[user].name}</Link></h1>
        <hr className="my-4" />
        <p className="lead">
          <Link className="btn btn-outline-primary" role="button" to={`${match.url}/work`}>Work</Link>
          <Link className="btn btn-outline-primary" role="button" to={`${match.url}/school`}>School</Link>
        </p>
        {renderRoutes(route.routes)}
    </div>
  )
}
  
 export default User;