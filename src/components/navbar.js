import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to={'/'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'/user'}>Users</Link>
          <Link className="nav-link" to={`/user/news`}>News</Link>
          <Link className="nav-link" to={`/user/movies`}>Movies</Link>
          <Link className="nav-link" to={`/user/nfl`}>NFL</Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navbar;