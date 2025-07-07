import { EventForm } from "../components/EventForm";
import { createEvent } from "../event.service";
import { useNavigate } from "react-router-dom";
import type { Event } from "../../types/Event";

export function EventCreate() {
  const navigate = useNavigate();

  const handleCreate = async (data: Omit<Event, "id">) => {
    try {
      await createEvent(data);
      navigate("/");
    } catch (error) {
      console.error("Error al crear evento", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Crear Nuevo Evento
        </h2>
        <EventForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}
