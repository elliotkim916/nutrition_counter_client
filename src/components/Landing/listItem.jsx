import React from 'react';
import checkmark from '../../stylesheets/images/checkmark.png';

const ListItem = props => {
  let listText = props.list.map((text, index) => 
    <li className="container-list-item" key={index}>
      <img src={checkmark} className="checkmark-icon" alt="checkmark"/>
      {text}
    </li>
  );

  return listText;
};

export default ListItem;