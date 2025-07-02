import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { EventList } from "./events/pages/EventList";
import { EventEdit } from "./events/pages/EventEdit";
import { EventForm } from "./events/components/EventForm";
import { createEvent } from "./api/events";
import type { Event } from "./types/Event";

// Componente que maneja las rutas y lógica con useNavigate
function AppRoutes() {
  const navigate = useNavigate();

const handleCreate = async (data: Omit<Event, "id">) => {
  try {
    await createEvent(data);
    navigate("/");
  } catch (error) {
    console.error("Error al crear evento:", error);
  }
};
  return (
    <Routes>
      <Route path="/" element={<EventList />} />
      <Route path="/eventos/crear" element={<EventForm onSubmit={handleCreate} />} />
      <Route path="/eventos/editar/:id" element={<EventEdit />} />
    </Routes>
  );
}

// Componente principal que envuelve en Router
export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}