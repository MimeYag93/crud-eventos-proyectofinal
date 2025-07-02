import { useEffect, useState } from "react";
import { getAllEvents, deleteEvent } from "../event.service";
import type { Event } from "../../types/Event";
import { useNavigate } from "react-router-dom";

export function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEvents().then(res => setEvents(res.data));
  }, []);

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div>
      <h2>Lista de Eventos</h2>
      <button onClick={() => navigate("/eventos/crear")}>Crear Evento</button>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.title} - {event.date}
            <button onClick={() => navigate(`/eventos/editar/${event.id}`)}>Editar</button>
            <button onClick={() => handleDelete(event.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}