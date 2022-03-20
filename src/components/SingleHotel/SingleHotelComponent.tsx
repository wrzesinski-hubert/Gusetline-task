import { hotelDataType, roomsDataType } from "../../types";
import PicturesGallery from "../PicturesGallery/PicturesGalleryComponent";
import StarRating from "../StarRating/StarRatingComponent";
import "./style.css";

const SingleHotel = (props: {
  hotel: hotelDataType;
  rooms: roomsDataType;
  starRating: number;
  adultsAmount: number;
  childrenAmount: number;
}) => {
  const { id, name, address1, address2, postcode, town, country, images } =
    props.hotel;
  const { starRating, rooms, adultsAmount, childrenAmount } = props;
  return (
    <div className="hotelContainer">
      <div className="hotelHeader">
        <div className="imageAndInfoWrapper">
          <PicturesGallery images={images} />
          <div className="titleContainer">
            <div className="hotelName">{name}</div>
            <div>{address1}</div>
            <div>{address2}</div>
            <div>{postcode}</div>
            <div>{town}</div>
            <div>{country}</div>
          </div>
        </div>
        <div className="starsContainer">
          <StarRating
            numberOfFillStars={starRating}
            numberOfEmptyStars={5 - starRating}
          />
        </div>
      </div>
      <div className="roomsContainer">
        {rooms &&
          rooms[id].rooms.map((room) => {
            const { name, occupancy, longDescription } = room;
            if (
              room.occupancy.maxAdults >= adultsAmount &&
              room.occupancy.maxChildren >= childrenAmount
            )
              return (
                <div className="singleRoom">
                  <div className="mainRoomInformation">
                    <div className="roomName">{name}</div>
                    <div>Adults: {occupancy.maxAdults}</div>
                    <div>Children: {occupancy.maxChildren}</div>
                  </div>
                  <div className="roomDescription">
                    <span>{longDescription}</span>
                  </div>
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default SingleHotel;
