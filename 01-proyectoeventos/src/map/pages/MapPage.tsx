import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../api/events"; 
import type { Event } from "../../types/Event";  

export const MapPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllEvents(); 
        setEvents(response.data);
      } catch (error) {
        console.error("Error cargando eventos para el mapa:", error);
      }
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
