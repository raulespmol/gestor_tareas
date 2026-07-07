import { Button } from "@/components/ui/button"
import { Toolbar } from "@/features/requerimientos/components/Toolbar/Toolbar";
import BuscadorRequerimientos from "./features/requerimientos/components/Toolbar/BuscadorRequerimientos";
import FiltroEstado from "./features/requerimientos/components/Toolbar/FiltroEstado";
import TablaRequerimientos from "@/features/requerimientos/components/Tabla/TablaRequerimientos"
import { useState } from "react";
import ModalNuevoRequerimiento from "./features/requerimientos/components/Modals/ModalNuevoRequerimiento";

export function App() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [filtroEstados, setFiltroEstados] = useState<number[]>([]);

  return (
    <div className="flex w-full min-h-svh p-6">
      <div className="flex min-w-0 w-full flex-col gap-4 text-sm leading-loose max-h-[calc(100vh-3rem)] overflow-hidden">
        <h1 className="text-2xl font-bold">Gestor de Requerimientos</h1>

        <Toolbar>
          <div className="flex gap-2 flex-direction-row w-3xl">
            <BuscadorRequerimientos
              value={globalFilter}
              onChange={setGlobalFilter}
            />
            <FiltroEstado 
              value={filtroEstados} 
              onChange={setFiltroEstados} 
            />
          </div>
          <Button onClick={() => setModalAbierto(true)}>
            Agregar Requerimiento
          </Button>
        </Toolbar>

        <TablaRequerimientos globalFilter={globalFilter} filtroEstados={filtroEstados}/>

        <ModalNuevoRequerimiento
          open={modalAbierto}
          onOpenChange={setModalAbierto}
        />
      </div>
    </div>
  )
}

export default App
