import { createContext, useContext, useEffect, useState } from "react";
import type { Trabajador } from "@/catalogos/trabajadores/trabajador.type";
import { obtenerTrabajadores } from "@/catalogos/trabajadores/trabajadores.service";

type CatalogosContextType = {
  trabajadores: Trabajador[]
};

type ProviderProps = {
  children: React.ReactNode;
};

const CatalogosContext = createContext<CatalogosContextType | null>(null);

export const CatalogosProvider = ({children}: ProviderProps) => {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);

  const cargarTrabajadores = async () => {
    const data = await obtenerTrabajadores()
    setTrabajadores(data)
  }

  useEffect(() => {
    cargarTrabajadores();
  }, []);

  return (
    <CatalogosContext.Provider value={{ trabajadores }}>
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



