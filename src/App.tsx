import { Button } from "@/components/ui/button"
import { Toolbar } from "@/features/requerimientos/components/Toolbar/Toolbar";
import BuscadorRequerimientos from "./features/requerimientos/components/Toolbar/BuscadorRequerimientos";
import TablaRequerimientos from "@/features/requerimientos/components/Tabla/TablaRequerimientos"
import { useState } from "react";
import ModalNuevoRequerimiento from "./features/requerimientos/components/ModalNuevoRequerimiento";

export function App() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="flex w-full min-h-svh p-6">
      <div className="flex min-w-0 w-full flex-col gap-4 text-sm leading-loose max-h-[calc(100vh-3rem)] overflow-hidden">
        <h1 className="text-2xl font-bold">Gestor de Tareas</h1>

        <Toolbar>
          <BuscadorRequerimientos
            value={globalFilter}
            onChange={setGlobalFilter}
          />
          <Button onClick={() => setModalAbierto(true)}>
            Agregar Requerimiento
          </Button>
        </Toolbar>

        <TablaRequerimientos globalFilter={globalFilter}/>

        <ModalNuevoRequerimiento
          open={modalAbierto}
          onOpenChange={setModalAbierto}
        />
      </div>
    </div>
  )
}

export default App
