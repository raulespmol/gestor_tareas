import { createContext, useContext, useEffect, useState } from "react";
import type { Pago } from "@/features/pagos/types/pago.type";
import type { RegistrarPagoFormData } from "@/features/pagos/schemas/registrarPago.schema";

type PagosContextType = {
  pagos: Pago[];
  agregarPago: (data: RegistrarPagoFormData, requerimientoId: string) => void;
  pagosPorRequerimiento: (requerimientoId: string) => Pago[];
};

type ProviderProps = {
  children: React.ReactNode;
  onPagoAgregado: (requerimientoId: string, monto: number) => void;
};

const PagosContext = createContext<PagosContextType | null>(null);

const cargarPagos = (): Pago[] => {
  try {
    const data = localStorage.getItem("pagos");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error al cargar pagos:", error);
    return [];
  }
};

const guardarPagos = (pagos: Pago[]) => {
  setTimeout(() => {
    try {
      localStorage.setItem("pagos", JSON.stringify(pagos));
    } catch (error) {
      console.error("Error al guardar pagos:", error);
    }
  }, 0);
};

export const PagosProvider = ({ children, onPagoAgregado }: ProviderProps) => {
  const [pagos, setPagos] = useState<Pago[]>(cargarPagos);

  useEffect(() => {
    guardarPagos(pagos);
  }, [pagos]);

  const agregarPago = (data: RegistrarPagoFormData, requerimientoId: string) => {
    const nuevoPago: Pago = {
      id: Date.now().toString(), // TEMPORAL
      requerimientoId,
      ...data,
      voucher: data.voucher ?? "",
    };
    setPagos((prev) => [...prev, nuevoPago]);
    onPagoAgregado(requerimientoId, data.monto);
  };

  const pagosPorRequerimiento = (requerimientoId: string) =>
    pagos.filter((p) => p.requerimientoId === requerimientoId);

  return (
    <PagosContext.Provider value={{ pagos, agregarPago, pagosPorRequerimiento }}>
      {children}
    </PagosContext.Provider>
  );
};

export const usePagos = () => {
  const context = useContext(PagosContext);
  if (!context) {
    throw new Error("usePagos must be used within a PagosProvider");
  }
  return context;
};