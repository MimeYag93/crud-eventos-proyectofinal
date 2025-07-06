//Guarda el valor del campo de entrada 
import { useState } from "react";
import { loginUser } from "../../../api/auth";
import { useUser } from "../../../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
// Cuando el usuario envía el formulario, llama a loginUser() y guarda el usuario en el contexto si fue exitoso
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      alert("Inicio de sesión exitoso");
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    // Aplicación de estilos en tailwind 
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-xl mt-10"
    >
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>

      <input
        type="email"
        placeholder="Correo"
        className="w-full p-2 border rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="w-full p-2 border rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Iniciar sesión
      </button>
    </form>
  );
}