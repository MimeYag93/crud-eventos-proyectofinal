import { EventForm } from "../components/EventForm";
import { createEvent } from "../event.service";
import { useNavigate } from "react-router-dom";
import type { Event } from "../../types/Event";

export function EventCreate() {
  const navigate = useNavigate();

  const handleCreate = async (data: Omit<Event, "id">) => {
    await createEvent(data);
    navigate("/");
  };

  return (
    <div>
      <h2>Crear Evento</h2>
      <EventForm onSubmit={handleCreate} />
    </div>
  );
}
