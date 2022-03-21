type singleRoomType = {
    name: string;
    occupancy: { maxAdults: number; maxChildren: number; maxOverall: number };
    longDescription: string;
    id:string;
  }[];
  
  export type roomsDataType = {
    [name: string]: {
      rooms: singleRoomType;
    };
  };
  
  export type hotelDataType = {
    name: string;
    address1: string;
    address2: string;
    id: string;
    postcode: string;
    town: string;
    country: string;
    starRating: string;
    images: { url: string }[];
    rooms: roomsDataType[];
  };