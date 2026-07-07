import { createContext, useContext, useEffect, useState } from "react";
import { requerimientosData } from "@/data/placeholder/requerimientos";
import { ordenarFechaAsc } from "@/features/requerimientos/utils/ordenarFecha";
import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";
import type { RequerimientoFormData } from "@/features/requerimientos/schemas/requerimiento.schema";

type RequerimientosContextType = {
  requerimientos: Requerimiento[];
  actualizarEstado: (idRequerimiento: number, nuevoEstadoId: number) => void;
  actualizarResponsable: (idRequerimiento: number, nuevoResponsableId: number) => void;
  agregarRequerimiento: (data: RequerimientoFormData) => void;
  editarRequerimiento: (actualizado: Requerimiento) => void;
  eliminarRequerimiento: (id: number) => void;
  registrarPago: (idRequerimiento: number, monto: number, medioPago: string, voucher?: string) => void;
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
    setRequerimientos((prev) => ordenarFechaAsc([...prev, nuevoRequerimiento]))
  };

  const editarRequerimiento = (actualizado: Requerimiento) => {
    setRequerimientos((prev) =>
      ordenarFechaAsc(prev.map((r) => (r.id === actualizado.id ? actualizado : r)))
    );
  };

  const eliminarRequerimiento = (id: number) => {
    setRequerimientos((prev) => prev.filter((r) => r.id !== id));
  };

  const registrarPago = (idRequerimiento: number, monto: number, medioPago: string, voucher?: string) => {
    const montoPago = Number(monto);

    if (!Number.isFinite(montoPago) || montoPago <= 0) return;

    setRequerimientos((prev) =>
      ordenarFechaAsc(
        prev.map((req) => {
          if (req.id !== idRequerimiento) return req;

          const pendienteActual = Math.max(0, req.montoTotal - req.montoPagado);
          const montoValido = Math.min(montoPago, pendienteActual);
          const nuevoMontoPagado = req.montoPagado + montoValido;
          const nuevoMontoPendiente = Math.max(0, req.montoTotal - nuevoMontoPagado);
          const detallePago = voucher?.trim() ? `Voucher: ${voucher.trim()}` : undefined;

          return {
            ...req,
            montoPagado: nuevoMontoPagado,
            montoPendiente: nuevoMontoPendiente,
            medioPago,
            otrosDatos: detallePago
              ? [req.otrosDatos, detallePago].filter(Boolean).join("\n")
              : req.otrosDatos,
          };
        })
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
      registrarPago
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