// Muestra los resultados
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllEvents } from "../../api/events"; 
import type { Event } from "../../types/Event";

export const SearchResults = () => {
  const [results, setResults] = useState<Event[]>([]);
  const location = useLocation();

    useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const filters = Object.fromEntries(params.entries());

        const response = await getAllEvents(filters); 
        setResults(response.data);                    
      } catch (error) {
        console.error("Error al obtener resultados:", error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Resultados de búsqueda</h2>
      {results.length > 0 ? (
        results.map((event) => (
          <div key={event.id} className="border p-4 rounded mb-2">
            <h3 className="font-bold">{event.title}</h3>
            <p>{event.date} - {event.location}</p>
          </div>
        ))
      ) : (
        <p>No se encontraron eventos.</p>
      )}
    </div>
  );
};