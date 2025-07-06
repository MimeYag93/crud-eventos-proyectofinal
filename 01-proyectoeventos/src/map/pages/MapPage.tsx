import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { getEvents } from "../../api/events"; // debe devolver eventos con lat/lng

export const MapPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents(); // debe incluir lat/lng
      setEvents(data);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <MapContainer center={[-0.2, -78.5]} zoom={12} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => (
          <Marker key={event.id} position={[event.lat, event.lng]}>
            <Popup>
              <strong>{event.title}</strong><br />
              {event.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
