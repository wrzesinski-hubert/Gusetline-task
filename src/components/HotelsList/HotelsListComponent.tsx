import { hotelDataType, roomsDataType } from "../../types";
import SingleHotel from "../SingleHotel/SingleHotelComponent";

const HotelsList = (props: {
  hotelData: hotelDataType[];
  roomsData: roomsDataType[];
  rating: number;
  adultsAmount: number;
  childrenAmount: number;
}) => {
  const { hotelData, roomsData, rating, adultsAmount, childrenAmount } = props;
  return (
    <>
      {hotelData.map((hotel: hotelDataType) => {
        const { id } = hotel;
        const starRating = parseInt(hotel.starRating);
        const rooms = roomsData.find((hotel: roomsDataType) => hotel[id]);
        if (
          starRating >= rating &&
          rooms &&
          rooms[id].rooms.find(
            (e: { occupancy: { maxAdults: number; maxChildren: number } }) =>
              e.occupancy.maxAdults >= adultsAmount &&
              e.occupancy.maxChildren >= childrenAmount
          )
        )
          return (
            <SingleHotel
              key={id}
              hotel={hotel}
              rooms={rooms}
              starRating={starRating}
              adultsAmount={adultsAmount}
              childrenAmount={childrenAmount}
            />
          );
      })}
    </>
  );
};

export default HotelsList;
