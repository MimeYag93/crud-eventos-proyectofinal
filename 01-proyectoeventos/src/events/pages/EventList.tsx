import { useEffect, useState } from "react";
import { getAllEvents, deleteEvent } from "../event.service";
import type { Event } from "../../types/Event";
import { useNavigate } from "react-router-dom";

export function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
  getAllEvents()
    .then(res => {
      console.log("Eventos recibidos:", res.data);
      setEvents(res.data);
    })
    .catch(error => {
      console.error("Error al obtener eventos:", error);
    });
}, []);

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
    setEvents(events.filter(e => e.id !== id));
  };

  return (
   <div className="p-6 max-w-xl mx-auto">
    <h2 className="text-3xl font-bold mb-4 text-center">Lista de Eventos</h2>
    <button
      onClick={() => navigate("/eventos/crear")}
      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Crear Evento
    </button>
    {events.length === 0 ? (
      <p className="text-center text-gray-500">No hay eventos para mostrar.</p>
    ) : (
      <ul className="space-y-3">
        {events.map(event => (
          <li
            key={event.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm text-gray-600">{event.date}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/eventos/editar/${event.id}`)}
                className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);
} 
