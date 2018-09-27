import React from 'react';
import { WeatherConnected } from './weather';
import { InspirationalQuoteConnected } from './inspirationalQuote';
import { Navbar } from './navbar';

export const Header = (props) => (
    <header>
      <h2>The PhillyMojo</h2>
      <WeatherConnected />
      <InspirationalQuoteConnected />
      <Navbar />
    </header>
)

export default Header;