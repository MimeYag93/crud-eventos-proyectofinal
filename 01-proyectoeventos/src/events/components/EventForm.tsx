import { useState } from "react";
import type { Event } from "../../types/Event";

interface Props {
  initialData?: Partial<Event>;
  onSubmit: (data: Omit<Event, "id">) => void;
}

export function EventForm({ initialData = {}, onSubmit }: Props) {
  const [form, setForm] = useState<Omit<Event, "id">>({
    title: initialData.title || "",
    location: initialData.location || "",
    date: initialData.date || "",
    category: initialData.category || "",
    type: initialData.type || "",
    lat: initialData.lat || 0,
    lng: initialData.lng || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "lat" || name === "lng" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10 space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">Crear / Editar Evento</h2>

      <input
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
        required
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
        required
      />

      <input
        name="location"
        placeholder="Ubicación"
        value={form.location}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <input
        name="category"
        placeholder="Categoría"
        value={form.category}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <input
        name="type"
        placeholder="Tipo de Evento"
        value={form.type}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <input
        name="lat"
        type="number"
        step="any"
        placeholder="Latitud"
        value={form.lat}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <input
        name="lng"
        type="number"
        step="any"
        placeholder="Longitud"
        value={form.lng}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar
      </button>
    </form>
  );
}