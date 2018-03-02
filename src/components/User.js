import React from 'react';
import { PageNotFound } from './PageNotFound';
import data from '../data';
import { Link } from 'react-router-dom';

export const User = ({ match }) => {
  const user = match.params.user;

  if(!data[user]) { return <PageNotFound />}

  return (
    <div>
      <div><Link to={`/user/${user}`}>{ data[user].name }</Link></div>
      <Link to={`${match.url}/work`}>Work</Link>
      <Link to={`${match.url}/school`}>School</Link>
    </div>
  )
}