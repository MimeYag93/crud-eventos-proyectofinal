import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { EventList } from "./events/pages/EventList";
import { EventEdit } from "./events/pages/EventEdit";
import { EventForm } from "./events/components/EventForm";
import { createEvent } from "./api/events";
import { useUser } from "./context/UserContext";
import  Login  from "./events/pages/auth/Login";
import { Register } from "./events/pages/auth/Register";
import { MapPage } from "./map/pages/MapPage";
import { SearchResults } from "./search/pages/SearchResults";
import type { Event } from "./types/Event";

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
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/mapa" element={<MapPage />} />
      <Route path="/busqueda" element={<SearchResults />} />
    </Routes>
  );
}

export default function App() {
  return (
  <div className="min-h-screen bg-yellow-50">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}