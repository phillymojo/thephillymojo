import React from 'react';

const typeMap = {
  'G': 'Gold',
  'S': 'Silver',
  'B': 'Bronze'
};

export const Medal = props => (

  <li className="medal">
    <span className={`symbol symbol-${props.type}`} title={typeMap[props.type]}>{props.type}</span>
    <span className="year">{props.year}</span>
    <span className="city"> {props.city}</span>
    <span className="event"> ({props.event})</span>
    <span className="category"> {props.category}</span>
  </li>
)

export default Medal;