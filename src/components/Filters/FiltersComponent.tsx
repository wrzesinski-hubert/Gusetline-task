import StarRatingFilter from "../StarRatingFilter/StarRatingFilterComponent";
import "./style.css";

const Filters = (props: {
  setRating: (rate: number) => void;
  setAdultsAmount: (adultsAmount: number) => void;
  setChildrenAmount: (childrenAmount: number) => void;
  adultsAmount: number;
  childrenAmount: number;
}) => {
  const {
    setRating,
    setAdultsAmount,
    setChildrenAmount,
    adultsAmount,
    childrenAmount,
  } = props;
  return (
    <div className="filtersContainer">
      <StarRatingFilter setRatingFilter={(rate: number) => setRating(rate)} />
      <div className="amountFilter">
        Adults:
        <span
          className="changeAmountButton"
          onClick={() => setAdultsAmount(adultsAmount + 1)}
        >
          +
        </span>
        <input
          value={adultsAmount}
          className="inputAmount"
          onChange={(e) =>
            setAdultsAmount(
              isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
            )
          }
        />
        <span
          className="changeAmountButton"
          onClick={() =>
            setAdultsAmount(adultsAmount > 0 ? adultsAmount - 1 : 0)
          }
        >
          -
        </span>
      </div>
      <div className="amountFilter">
        Children:
        <span
          className="changeAmountButton"
          onClick={() => setChildrenAmount(childrenAmount + 1)}
        >
          +
        </span>
        <input
          className="inputAmount"
          value={childrenAmount}
          onChange={(e) =>
            setChildrenAmount(
              isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
            )
          }
        />
        <span
          className="changeAmountButton"
          onClick={() =>
            setChildrenAmount(childrenAmount > 0 ? childrenAmount - 1 : 0)
          }
        >
          -
        </span>
      </div>
    </div>
  );
};

export default Filters;
