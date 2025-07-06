//Formulario de búsqueda 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchForm = () => {
  const [filters, setFilters] = useState({
    location: "",
    date: "",
    category: "",
    type: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(filters).toString();
    navigate(`/search?${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-4 p-4">
      <input type="text" name="location" placeholder="Ubicación" onChange={handleChange} className="border p-2" />
      <input type="date" name="date" onChange={handleChange} className="border p-2" />
      <input type="text" name="category" placeholder="Categoría" onChange={handleChange} className="border p-2" />
      <input type="text" name="type" placeholder="Tipo de evento" onChange={handleChange} className="border p-2" />
      <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Buscar</button>
    </form>
  );
};