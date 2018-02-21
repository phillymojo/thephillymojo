import React from 'react';
import { Link } from 'react-router';

export const AthletesMenu = () => {

  <nav className="athletes-menu">
    {this.props.athletes.map(menuAthlete => {
      return <Link key={menuAthlete.id} to={`/athlete/${menuAthlete.id}`} activeClassName="active">
        {menuAthlete.name}
      </Link>;
    })}
  </nav>
}

export default AthletesMenu;