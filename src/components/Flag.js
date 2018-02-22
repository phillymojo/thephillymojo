import React from 'react';

const data = {
  'cu': {
    'name': 'Cuba',
    'icon': 'flag-cu.png',
  },
  'fr': {
    'name': 'France',
    'icon': 'flag-fr.png',
  },
  'jp': {
    'name': 'Japan',
    'icon': 'flag-jp.png',
  },
  'nl': {
    'name': 'Netherlands',
    'icon': 'flag-nl.png',
  },
  'uz': {
    'name': 'Uzbekistan',
    'icon': 'flag-uz.png',
  }
};

export const Flag = props => (
  <span className="flag">
    <img className="icon" title={props.name} src={`/img/${props.icon}`} />
    {props.showName && <span className="name"> {props.name}</span>}
  </span>
);

export default Flag;