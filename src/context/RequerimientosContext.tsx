import { createContext, useContext, useEffect, useState } from "react";
import { requerimientosData } from "@/data/placeholder/requerimientos";
import { ordenarFechaAsc } from "@/features/requerimientos/utils/ordenarFecha";
import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";
import type { RequerimientoFormData } from "@/features/requerimientos/schemas/nuevoRequerimiento.schema";

type RequerimientosContextType = {
  requerimientos: Requerimiento[];
  actualizarEstado: (idRequerimiento: string, nuevoEstadoId: string) => void;
  actualizarResponsable: (idRequerimiento: string, nuevoResponsableId: string) => void;
  agregarRequerimiento: (data: RequerimientoFormData) => void;
  editarRequerimiento: (actualizado: Requerimiento) => void;
  eliminarRequerimiento: (id: string) => void;
  actualizarMontos: (requerimientoId: string, montoPagado: number) => void;
}

type ProviderProps = {
  children: React.ReactNode;
}

const RequerimientosContext = createContext<RequerimientosContextType | null>(null);

const cargarRequerimientos = (): Requerimiento[] => {
  try {
    const data = localStorage.getItem("requerimientos");
    const requerimientos = data ? JSON.parse(data) : requerimientosData;

    return ordenarFechaAsc(requerimientos)
  } catch (error) {
    console.error("Error al cargar requerimientos:", error);
    return ordenarFechaAsc(requerimientosData)

  }
}

const guardarRequerimientos = (requerimientos: Requerimiento[]) => {
  setTimeout(() => {
    try {
      localStorage.setItem("requerimientos", JSON.stringify(requerimientos));
    } catch (error) {
      console.error("Error al guardar requerimientos:", error);
    }
  }, 0);
};

export const RequerimientosProvider = ({children}: ProviderProps) => {
  const [requerimientos, setRequerimientos] = useState<Requerimiento[]>(cargarRequerimientos);

  useEffect(() => {
    guardarRequerimientos(requerimientos);
  }, [requerimientos])

  const actualizarEstado = (idRequerimiento: string, nuevoEstadoId: string) => {
    setRequerimientos((prev) => 
      prev.map(req => req.id === idRequerimiento ? {...req, estadoId: nuevoEstadoId} : req)
    );
  };

  const actualizarResponsable = (idRequerimiento: string, nuevoResponsableId: string) => {
    setRequerimientos((prev) => 
      prev.map(req => req.id === idRequerimiento ? {...req, responsableId: nuevoResponsableId} : req)
    );
  };

  const agregarRequerimiento = (data: RequerimientoFormData) => {
    const nuevoRequerimiento: Requerimiento = {
      id: Date.now().toString(), // TEMPORAL
      ...data,
      montoPendiente: data.montoTotal,
      montoPagado: 0,
      medioPago: "",
    }
    
    setRequerimientos((prev) => ordenarFechaAsc([...prev, nuevoRequerimiento]))
  }

  const editarRequerimiento = (actualizado: Requerimiento) => {
    setRequerimientos((prev) =>
      ordenarFechaAsc(prev.map((r) => (r.id === actualizado.id ? actualizado : r)))
    );
  };

  const eliminarRequerimiento = (id: string) => {
    setRequerimientos((prev) => prev.filter((r) => r.id !== id));
  };

 const actualizarMontos = (requerimientoId: string, montoPagado: number) => {
  setRequerimientos((prev) =>
    prev.map((r) =>
      r.id === requerimientoId
        ? { ...r,  
            montoPagado: r.montoPagado + montoPagado, 
            montoPendiente: r.montoPendiente - montoPagado }
        : r
    )
  );
};

  return (
    <RequerimientosContext.Provider value={{ 
      requerimientos, 
      actualizarEstado, 
      actualizarResponsable, 
      agregarRequerimiento,
      editarRequerimiento,
      eliminarRequerimiento,
      actualizarMontos
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