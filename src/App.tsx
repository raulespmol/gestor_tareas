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
  const [filtroEstados, setFiltroEstados] = useState<string[]>([]);

  return (
    <div className="flex w-full h-screen bg-background flex-col overflow-hidden">

      <div className="bg-background p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-2xl font-bold">Gestor de Requerimientos</h1>
        </div>
      </div>

      <div className="bg-muted/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
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
        </div>
      </div>
  
      <div className="bg-background p-4 flex-1 min-h-0">
        <TablaRequerimientos globalFilter={globalFilter} filtroEstados={filtroEstados}/>
      </div>

      <ModalNuevoRequerimiento
        open={modalAbierto}
        onOpenChange={setModalAbierto}
      />
      </div>
  )
}

export default App
