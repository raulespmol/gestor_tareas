import { createContext, useContext, useEffect, useState } from "react";
import { placeholderData } from "@/data/data_placeholder";
import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";
import type { RequerimientoFormData } from "@/features/requerimientos/schemas/requerimiento.schema";

type RequerimientosContextType = {
  requerimientos: Requerimiento[];
  actualizarEstado: (idRequerimiento: number, nuevoEstadoId: number) => void;
  actualizarResponsable: (idRequerimiento: number, nuevoResponsableId: number) => void;
  agregarRequerimiento: (data: RequerimientoFormData) => void;
}

type ProviderProps = {
  children: React.ReactNode;
}

const RequerimientosContext = createContext<RequerimientosContextType | null>(null);

const cargarRequerimientos = (): Requerimiento[] => {
  try {
    const data = localStorage.getItem("requerimientos");
    return data ? JSON.parse(data) : placeholderData;
  } catch (error) {
    console.error("Error al cargar requerimientos:", error);
    return placeholderData;
  }
}

const guardarRequerimientos = (requerimientos: Requerimiento[]) => {
  try {
    localStorage.setItem("requerimientos", JSON.stringify(requerimientos));
  } catch (error) {
    console.error("Error al guardar requerimientos:", error);
  }
}

export const RequerimientosProvider = ({children}: ProviderProps) => {
  const [requerimientos, setRequerimientos] = useState<Requerimiento[]>(cargarRequerimientos);

  useEffect(() => {
    guardarRequerimientos(requerimientos);
  }, [requerimientos])

  const actualizarEstado = (idRequerimiento: number, nuevoEstadoId: number) => {
    setRequerimientos((prev) => 
      prev.map(req => req.id === idRequerimiento ? {...req, estadoId: nuevoEstadoId} : req)
    );
  };

  const actualizarResponsable = (idRequerimiento: number, nuevoResponsableId: number) => {
    setRequerimientos((prev) => 
      prev.map(req => req.id === idRequerimiento ? {...req, responsableId: nuevoResponsableId} : req)
    );
  };

  const agregarRequerimiento = (data: RequerimientoFormData) => {
    const nuevoRequerimiento: Requerimiento = {
      id: Date.now(), // TEMPORAL
      ...data,
      montoPendiente: (data.montoTotal - data.montoPagado)
    };
    setRequerimientos((prev) => [...prev, nuevoRequerimiento]);
  };

  return (
    <RequerimientosContext.Provider value={{ 
      requerimientos, 
      actualizarEstado, 
      actualizarResponsable, 
      agregarRequerimiento 
    }}>
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