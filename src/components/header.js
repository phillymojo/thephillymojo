import React from 'react';
import { Link } from 'react-router-dom';
import { WeatherConnected } from './weather';
import { InspirationalQuoteConnected } from './inspirationalQuote';
import { Navbar } from './navbar';

export const Header = (props) => (
    <header>
      <h2>The PhillyMojo</h2>
      <WeatherConnected />
      <InspirationalQuoteConnected />
      {/* <Navbar /> */}
      <Link className="nav-link1" to={'/user'}>Users</Link>
      <Link className="nav-link1" to={`/news`}>News</Link>
      <Link className="nav-link1" to={`/movies`}>Movies</Link>
      <Link className="nav-link1" to={`/nfl`}>NFL</Link>
    </header>
)

export default Header;