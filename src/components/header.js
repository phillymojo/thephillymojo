import React from 'react';
import { Link } from 'react-router-dom';
import { WeatherConnected } from './weather';
import { InspirationalQuoteConnected } from './inspirationalQuote';
import { Navbar } from './navbar';

export const Header = (props) => (
    <header>
      <div  className="container">
        <div className="header_title row">
          <div className="col-sm"><h2>The PhillyMojo</h2></div>
          <WeatherConnected />
        </div>
        <div className="quote row justify-content-end">
          <InspirationalQuoteConnected />
        </div>
        {/* <Navbar /> */}
        <div className="row">
          <Link className="nav-link1 col-sm-1" to={'/user'}>Users</Link>
          <Link className="nav-link1 col-sm-1" to={`/news`}>News</Link>
          <Link className="nav-link1 col-sm-1" to={`/movies`}>Movies</Link>
          <Link className="nav-link1 col-sm-1" to={`/nfl`}>NFL</Link>
        </div>
      </div>
    </header>
)

export default Header;