export const fetchHotels = async () => {
  const res = await fetch(
    "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG"
  );
  const json = await res.json();
  return json;
};

export const fetchRoom = async (hotelId: string) => {
  const res = await fetch(
    `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotelId}`
  );
  const json = await res.json();
  return json;
};

export const fetchRooms = async (hotelIds: { id: string }[]) => {
  const promises = hotelIds.map(({ id }) => fetchRoom(id));
  const values = await Promise.all(promises);
  return values;
};