import React, { useEffect, useState } from "react";
import StarRatingFilter from "./components/StarRatingFilter/StarRatingFilterComponent";
import PicturesGallery from "./components/PicturesGallery/PicturesGalleryComponent";
import StarRating from "./components/StarRating/StarRatingComponent";
import "./App.css";

type singleRoomType = {
  name: string;
  occupancy: { maxAdults: number; maxChildren: number; maxOverall: number };
  longDescription: string;
}[];

type roomsDataType = {
  [name: string]: {
    rooms: singleRoomType;
  };
};

type hotelDataType = {
  name: string;
  address1: string;
  address2: string;
  id: string;
  postcode: string;
  town: string;
  country: string;
  starRating: string;
  images: { url: string }[];
};

const App = () => {
  const [hotelData, setHotelData] = useState<hotelDataType[]>([]);
  const [roomsData, setRoomsData] = useState<roomsDataType[]>([]);
  const [rating, setRating] = useState(0);
  const [adultsAmount, setAdultsAmount] = useState(0);
  const [childrenAmount, setChildrenAmount] = useState(0);

  useEffect(() => {
    const fetchHotels = async () => {
      const res = await fetch(
        "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG"
      );
      const json = await res.json();
      return json;
    };

    const fetchRoom = async (hotelId: string) => {
      const res = await fetch(
        `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotelId}`
      );
      const json = await res.json();
      return json;
    };

    const fetchRooms = async (hotelIds: { id: string }[]) => {
      const promises = hotelIds.map(({ id }) => fetchRoom(id));
      const values = await Promise.all(promises);
      return values;
    };

    const fetchData = async () => {
      const hotels = await fetchHotels();
      const hotelIds = hotels.map(({ id }: { id: string }) => ({ id }));
      const rooms = await fetchRooms(hotelIds);
      let a: roomsDataType[] = [];
      hotelIds.map((item: { id: string }, index: number) =>
        a.push({ [item.id]: rooms[index] })
      );
      setHotelData(hotels);
      setRoomsData(a);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {console.log(roomsData)}
      {console.log(hotelData)}
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
      {hotelData.map((hotel: hotelDataType) => {
        const {
          id,
          name,
          address1,
          address2,
          postcode,
          town,
          country,
          images,
        } = hotel;
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
      })}
    </div>
  );
};

export default App;
