const StarRating = (props: {
  numberOfFillStars: number;
  numberOfEmptyStars: number;
}) => {
  return (
    <>
      {[...Array(props.numberOfFillStars)].map((star, index) => {
        index += 1;
        return <span key={index}>&#9733;</span>;
      })}
      {[...Array(props.numberOfEmptyStars)].map((star, index) => {
        index += 1;
        return <span key={index}>&#9734;</span>;
      })}
    </>
  );
};

export default StarRating;
