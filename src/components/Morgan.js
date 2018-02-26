import React from 'react';
import { Link } from 'react-router-dom';

export const Morgan = ({ match }) => (
  <div>
    <div>Morgan</div>
    <Link to={`${match.url}/work`}>Work</Link>
    <Link to={`${match.url}/school`}>School</Link>
  </div>
)

export default Morgan;