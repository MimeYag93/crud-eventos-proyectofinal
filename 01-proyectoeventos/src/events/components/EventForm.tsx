import { useState } from "react";
import type { Event } from "../../types/Event";

interface Props {
  initialData?: Partial<Event>;
  onSubmit: (data: Omit<Event, "id">) => void;
}

export function EventForm({ initialData = {}, onSubmit }: Props) {
  const [form, setForm] = useState<Omit<Event, "id">>({
    title: initialData.title || "",
    description: initialData.description || "",
    date: initialData.date || "",
    location: initialData.location || "",
    category: initialData.category || "",
    latitude: initialData.latitude || 0,
    longitude: initialData.longitude || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Convertir valores numéricos correctamente
    if (name === "latitude" || name === "longitude") {
      setForm({ ...form, [name]: parseFloat(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Título" value={form.title} onChange={handleChange} />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <input name="location" placeholder="Ubicación" value={form.location} onChange={handleChange} />
      <input name="category" placeholder="Categoría" value={form.category} onChange={handleChange} />
      <input name="latitude" type="number" value={form.latitude} onChange={handleChange} />
      <input name="longitude" type="number" value={form.longitude} onChange={handleChange} />
      <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );
}