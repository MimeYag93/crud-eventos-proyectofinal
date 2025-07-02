import { useEffect, useState } from "react";
import { getEventById, updateEvent } from "../event.service";
import { useParams, useNavigate } from "react-router-dom";
import { EventForm } from "../components/EventForm";
import type { Event } from "../../types/Event";

export function EventEdit() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEventById(id).then(res => setEvent(res.data));
    }
  }, [id]);

  const handleUpdate = async (data: Omit<Event, "id">) => {
    if (id) {
      await updateEvent(id, data);
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Editar Evento</h2>
      {event && <EventForm initialData={event} onSubmit={handleUpdate} />}
    </div>
  );
}