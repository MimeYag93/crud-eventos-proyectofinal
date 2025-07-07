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
  <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Editar Evento
        </h2>
        {event && <EventForm initialData={event} onSubmit={handleUpdate} />}
      </div>
    </div>
  );
}