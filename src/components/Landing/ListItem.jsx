import React from 'react';
import checkmark from '../../stylesheets/images/checkmark.png';

const ListItem = React.memo(({ list }) => {
  return list.map((text, index) => (
    <li className="container-list-item" key={index}>
      <img src={checkmark} className="checkmark-icon" alt="checkmark" />
      {text}
    </li>
  ));
});

export default ListItem;
