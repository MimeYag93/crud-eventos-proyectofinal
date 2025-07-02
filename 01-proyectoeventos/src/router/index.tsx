import { Routes, Route } from "react-router-dom";
import { EventList } from "../events/pages/EventList";
import { EventCreate } from "../events/pages/EventCreate";
import { EventEdit } from "../events/pages/EventEdit";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<EventList />} />
      <Route path="/eventos/crear" element={<EventCreate />} />
      <Route path="/eventos/editar/:id" element={<EventEdit />} />
    </Routes>
  );
}