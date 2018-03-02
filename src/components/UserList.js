import React from 'react';
import { Link } from 'react-router-dom';

const UserList = () => (
  <div className="userList">
    <span><Link to={`/user/morgan`}>Morgan</Link></span>
    <span><Link to={`/user/renata`}>Renata</Link></span> 
    <span><Link to={`/user/tori`}>Tori</Link></span> 
  </div>
)

export default UserList;