import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

const UserList = ({ route }) => (
  <div className="userList">
    <span><Link to={`/user/morgan`}>Morgan</Link></span>
    <span><Link to={`/user/renata`}>Renata</Link></span> 
    <span><Link to={`/user/tori`}>Tori</Link></span> 
    {renderRoutes(route.routes)}
  </div>
)

export default UserList;