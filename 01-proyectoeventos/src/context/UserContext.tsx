// Archivo para guardar la sesión 
import React, { createContext, useState, useContext,ReactNode } from "react";

// Define el tipo del usuario (puedes modificar según tus campos)
type User = {
  email: string;
  // puedes agregar más campos como nombre, rol, etc.
};

// Define el tipo del contexto
type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// Crea el contexto con tipo correcto
const UserContext = createContext<UserContextType | undefined>(undefined); //Crea contexto para compartir el usuario actual entre componentes
// hook personalizado para acceder fácilmente al contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }
  return context;
}; 
// Proveedor del contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
// Provee el user a todos los componentes hijos
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};