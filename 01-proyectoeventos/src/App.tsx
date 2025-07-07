import React, { ReactNode,} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { EventList } from "./events/pages/EventList";
import { EventEdit } from "./events/pages/EventEdit";
import { EventForm } from "./events/components/EventForm";
import { createEvent } from "./api/events";
import { SearchResults } from "./search/pages/SearchResults";
import type { Event } from "./types/Event";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import { useState } from "react";
import { getAllEvents } from "./api/events";
// Layout con navegación
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col">
      <nav className="bg-white shadow p-4 flex gap-6 items-center">
        <Link to="/" className="text-blue-600 hover:underline font-semibold">
          Inicio
        </Link>
        <Link
          to="/eventos/crear"
          className="text-blue-600 hover:underline font-semibold"
        >
          Crear Evento
        </Link>
        <Link to="/mapa" className="text-blue-600 hover:underline font-semibold">
          Mapa
        </Link>
        <div className="ml-auto flex gap-4">
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </Link>
          <Link
            to="/registro"
            className="text-blue-600 hover:underline font-semibold"
          >
            Registro
          </Link>
        </div>
      </nav>
      <main className="flex-grow p-6">{children}</main>
      <footer className="bg-white text-center p-4 text-gray-500">
        &copy; 2025 Mi Proyecto Eventos
      </footer>
    </div>
  );
}

// Componente Login
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Intentando login con:\nEmail: ${email}\nPassword: ${password}`);
    // Aquí iría fetch real al backend
    navigate("/"); // redirigir a inicio tras login exitoso
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="block mb-2 p-2 w-full border"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="block mb-4 p-2 w-full border"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">
        Entrar
      </button>
    </form>
  );
}

// Componente Registro
function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      `Intentando registro con:\nNombre: ${nombre}\nEmail: ${email}\nPassword: ${password}`
    );
    // Aquí iría fetch real al backend
    navigate("/login"); // redirigir a login tras registro exitoso
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 border rounded"
    >
      <h2 className="text-xl mb-4">Registro</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="block mb-2 p-2 w-full border"
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="block mb-2 p-2 w-full border"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="block mb-4 p-2 w-full border"
      />
      <button
        type="submit"
        className="bg-green-600 text-white p-2 w-full rounded"
      >
        Registrar
      </button>
    </form>
  );
}

// Componente Mapa simple (placeholder)
function Mapa() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("Error al cargar eventos para el mapa:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-[80vh] border rounded">
      <h2 className="text-xl mb-4 text-center">Mapa de Eventos</h2>
      <MapContainer
        center={[-0.2, -78.5]} // Cambia si tu ubicación inicial es distinta
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-0 rounded"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => (
          <Marker key={event.id} position={[event.lat, event.lng]}>
            <Popup>
              <strong>{event.title}</strong>
              <br />
              {event.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Componente para crear evento
function EventCreateWrapper() {
  const navigate = useNavigate();

  const handleCreate = async (data: Omit<Event, "id">) => {
    try {
      await createEvent(data);
      navigate("/");
    } catch (error) {
      console.error("Error al crear evento:", error);
      alert("Error creando evento");
    }
  };

  return <EventForm onSubmit={handleCreate} />;
}

// Rutas principales
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EventList />} />
      <Route path="/eventos/crear" element={<EventCreateWrapper />} />
      <Route path="/eventos/editar/:id" element={<EventEdit />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/busqueda" element={<SearchResults />} />
      <Route
        path="*"
        element={
          <div className="text-center text-red-600 text-xl mt-10">
            404 - Página no encontrada
          </div>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}