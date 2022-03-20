import React, { useEffect, useState } from "react";
import "./style.css";

const StarRatingFilter = (props: { setRatingFilter: any }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="starFilter">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <div
            key={index}
            onClick={() => {
              setRating(index);
              props.setRatingFilter(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            {index <= (hover || rating) ? <>&#9733;</> : <>&#9734;</>}
          </div>
        );
      })}
    </div>
  );
};

export default StarRatingFilter;
