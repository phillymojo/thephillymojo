import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './header';

export const Layout = props => (
  <div className="app-container">
    <Header />
    <div className="app_content">{props.children}</div>
    <footer>
      <Link to={`/`}>Homepage</Link>
    </footer>
  </div>
)

export default Layout;

