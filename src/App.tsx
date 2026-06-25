import { Button } from "@/components/ui/button"
import TablaRequerimientos from "@/components/Requerimientos/Tabla/TablaRequerimientos"
import { useState } from "react";
import ModalNuevoRequerimiento from "./components/Requerimientos/ModalNuevoRequerimiento";

export function App() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="flex w-full min-h-svh p-6">
      <div className="flex min-w-0 w-full flex-col gap-4 text-sm leading-loose max-h-[calc(100vh-3rem)] overflow-hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestor de Tareas</h1>
          <Button onClick={() => setModalAbierto(true)}>
            Agregar Tarea
          </Button>
        </div>
        <TablaRequerimientos />
        <ModalNuevoRequerimiento
          open={modalAbierto}
          onOpenChange={setModalAbierto}
        />
      </div>
    </div>
  )
}

export default App
