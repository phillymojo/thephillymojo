import React from 'react';
import { Route, Switch, Link} from 'react-router-dom';


export const Homepage = () => (
  <div>
    <div>Homepage</div>
    <div>
      <span><Link to={`/morgan`}>Morgan</Link></span>
      <span><Link to={`/renata`}>Renata</Link></span> 
      <span><Link to={`/tori`}>Tori</Link></span> 
    </div>
  </div>
)