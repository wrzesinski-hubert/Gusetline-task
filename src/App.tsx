import { useEffect, useState } from "react";
import "./App.css";
import Filters from "./components/Filters/FiltersComponent";
import HotelsList from "./components/HotelsList/HotelsListComponent";
import { hotelDataType, roomsDataType } from "./types";
import { fetchHotels, fetchRooms } from "./utils";

const App = () => {
  const [hotelData, setHotelData] = useState<hotelDataType[]>([]);
  const [roomsData, setRoomsData] = useState<roomsDataType[]>([]);
  const [rating, setRating] = useState(0);
  const [adultsAmount, setAdultsAmount] = useState(0);
  const [childrenAmount, setChildrenAmount] = useState(0);

  useEffect(() => {
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
      <Filters
        setRating={setRating}
        setAdultsAmount={setAdultsAmount}
        setChildrenAmount={setChildrenAmount}
        adultsAmount={adultsAmount}
        childrenAmount={childrenAmount}
      />
      <HotelsList
        hotelData={hotelData}
        roomsData={roomsData}
        rating={rating}
        adultsAmount={adultsAmount}
        childrenAmount={childrenAmount}
      />
    </div>
  );
};

export default App;
