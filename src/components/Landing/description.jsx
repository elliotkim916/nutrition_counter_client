import React from 'react';
import ListItem from './listItem';

const Description = props => {
  let additionalImage;
  if (props.addlImgData) {
    additionalImage = <img src={props.addlImgData.imgSrc} className={props.addlImgData.imgClass} alt={props.addlImgData.imgAlt} />
  } else {
    additionalImage = null;
  }
  
  return (
    <div className={props.cssClass}>
      <h3 className="container-headers">{props.header}</h3>
      <img src={props.imgData.imgSrc} className={props.imgData.imgClass} alt={props.imgData.imgAlt}/>
      {additionalImage}
      
      <ul>
        <ListItem list={props.list}/>
      </ul>
    </div>
  );
}

export default Description;