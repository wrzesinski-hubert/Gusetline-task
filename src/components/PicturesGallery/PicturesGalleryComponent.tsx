import React, { useEffect, useState } from "react";
import "./style.css";
const PicturesGallery = (props: { images: { url: string }[] }) => {
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
  return (
    <div className="picturesContainer">
      {props.images.length > 1 && (
        <div className="buttonImagesWrapper">
          <div
            className="buttonLeft"
            onClick={() =>
              setCurrentPictureIndex(
                currentPictureIndex === 0 ? 0 : currentPictureIndex - 1
              )
            }
          >
            &#10094;
          </div>
          <div
            className="buttonRight"
            onClick={() =>
              setCurrentPictureIndex(
                currentPictureIndex === props.images.length - 1
                  ? props.images.length - 1
                  : currentPictureIndex + 1
              )
            }
          >
            &#10095;
          </div>
        </div>
      )}
      <img className="picture" src={props.images[currentPictureIndex].url} />
    </div>
  );
};

export default PicturesGallery;
