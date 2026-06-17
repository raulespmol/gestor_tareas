import { createContext, useContext, useState } from "react";
import { placeholderData } from "@/data/data_placeholder";
import type { Requerimiento } from "@/types/requerimiento";

type RequerimientosContextType = {
  requerimientos: Requerimiento[];
  actualizarEstado: (idRequerimiento: number, nuevoEstadoId: number) => void;
}

type ProviderProps = {
  children: React.ReactNode;
}

const RequerimientosContext = createContext<RequerimientosContextType | null>(null);

export const RequerimientosProvider = ({children}: ProviderProps) => {
  const [requerimientos, setRequerimientos] = useState<Requerimiento[]>(placeholderData);

  const actualizarEstado = (idRequerimiento: number, nuevoEstadoId: number) => {
    setRequerimientos((prev) => 
      prev.map(req => req.id === idRequerimiento ? {...req, estadoId: nuevoEstadoId} : req)
    );
  };

  return (
    <RequerimientosContext.Provider value={{ requerimientos, actualizarEstado }}>
      {children}
    </RequerimientosContext.Provider>
  );
};

export const useRequerimientos = () => {
  const context = useContext(RequerimientosContext);
  if (!context) {
    throw new Error("useRequerimientos must be used within a RequerimientosProvider");
  }
  return context;
}