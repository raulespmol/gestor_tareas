import { Button } from "@/components/ui/button"
import TablaRequerimientos from "@/components/Requerimientos/TablaRequerimientos"

export function App() {
  return (
    <div className="flex w-full min-h-svh p-6">
      <div className="flex min-w-0 w-full flex-col gap-4 text-sm leading-loose max-h-[calc(100vh-3rem)] overflow-hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestor de Tareas</h1>
          <Button>Agregar Tarea</Button>
        </div>
        <TablaRequerimientos />
      </div>
    </div>
  )
}

export default App
