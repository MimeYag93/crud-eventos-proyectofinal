// Muestra los resultados
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getEvents } from "../../api/events"; // debes tener una función que reciba filtros

export const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const filters = Object.fromEntries(params.entries());
      const data = await getEvents(filters); // deberás adaptar esta función
      setResults(data);
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