import { createContext, useContext, useEffect, useState } from "react";

import type { Trabajador } from "@/catalogos/trabajadores/trabajador.type";
import type { Estado } from "@/catalogos/estados/estado.type";
import type { MedioPago } from "@/catalogos/medios_pago/medio_pago.type";

import { obtenerTrabajadores } from "@/catalogos/trabajadores/trabajadores.service";
import { obtenerEstados } from "@/catalogos/estados/estados.services";
import { obtenerMediosPago } from "@/catalogos/medios_pago/medios_pago.service";

type CatalogosContextType = {
  trabajadores: Trabajador[]
  estados: Estado[]
  medios_pago: MedioPago[]
};

type ProviderProps = {
  children: React.ReactNode;
};

const CatalogosContext = createContext<CatalogosContextType | null>(null);

export const CatalogosProvider = ({children}: ProviderProps) => {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [medios_pago, setMediosPago] = useState<MedioPago[]>([]);

  const cargarTrabajadores = async () => {
    const data = await obtenerTrabajadores()
    setTrabajadores(data)
  }

  const cargarEstados = async () => {
    const data = await obtenerEstados()
    setEstados(data)
  }

  const cargarMediosPago = async () => {
    const data = await obtenerMediosPago()
    setMediosPago(data)
  }

  useEffect(() => {
    cargarTrabajadores();
    cargarEstados()
    cargarMediosPago()
  }, []);

   return (
    <CatalogosContext.Provider value={{ trabajadores, estados, medios_pago }}>
      {children}
    </CatalogosContext.Provider>
  );
};
  
export const useCatalogos = () => {
  const context = useContext(CatalogosContext);
  if (!context) {
    throw new Error("useCatalogos must be used within a CatalogosProvider");
  }
  return context;
};