import React from 'react';
import ListItem from './ListItem';

const Description = React.memo(
  ({ addlImgData, imgData, cssClass, header, list }) => {
    let additionalImage;
    if (addlImgData) {
      additionalImage = (
        <img
          src={addlImgData.imgSrc}
          className={addlImgData.imgClass}
          alt={addlImgData.imgAlt}
        />
      );
    } else {
      additionalImage = null;
    }

    return (
      <div className={cssClass}>
        <h3 className="container-headers">{header}</h3>
        <img
          src={imgData.imgSrc}
          className={imgData.imgClass}
          alt={imgData.imgAlt}
        />
        {additionalImage}

        <ul>
          <ListItem list={list} />
        </ul>
      </div>
    );
  }
);

export default Description;
