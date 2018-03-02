import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = props => (
  <div className="app-container">
    <header>
      <h2>The PhillyMojo</h2>
    </header>
    <nav>
      <ul>
        <li><Link to={`/user`}>Users</Link></li>
        <li>Link</li>
        <li>Link</li>
      </ul>
    </nav>
    <div className="app-content">{props.children}</div>
    <footer>
      <Link to={`/`}>Homepage</Link>
    </footer>
  </div>
)

export default Layout;

