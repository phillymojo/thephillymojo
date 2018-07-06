import React from 'react';
import { PageNotFound } from './PageNotFound';
import data from '../data';
import { ChuckConnected } from './chuck';

export const Info = ({ match }) => {
  const user = match.params.user;
  if(!data[user]) return (<div />)
  const info = match.params.info;
  if(!data[user][info]) { return <PageNotFound /> }
  return (
    <div className="userInfo">
      { data[user][info] }
    </div>
  )
}