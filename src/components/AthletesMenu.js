import React from 'react';
import { Link } from 'react-router-dom';

export const AthletesMenu = ({ athletes }) => (

  <nav className="athletes-menu">
    {athletes.map(menuAthlete => {
      return (<Link key={menuAthlete.id} to={`/athlete/${menuAthlete.id}`} activeclassname="active">
        {menuAthlete.name}
    </Link>);
    })}
  </nav>
)

export default AthletesMenu;