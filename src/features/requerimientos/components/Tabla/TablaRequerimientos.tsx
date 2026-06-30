import { useRequerimientos } from "@/context/RequerimientosContext";
import { useState } from "react";

import { DataTable } from "./DataTable";
import { createColumns } from "./columns";
import { camposBusqueda } from "../../utils/camposBusqueda";
import ModalEditarRequerimiento from "../ModalEditarRequerimiento";

import type { Requerimiento } from "../../types/requerimiento.type";

type TablaRequerimientosProps = {
  globalFilter: string
}

const TablaRequerimientos = ({ globalFilter }: TablaRequerimientosProps) => {  
  const { requerimientos } = useRequerimientos();
  const [requerimientoAEditar, setRequerimientoAEditar] = useState<Requerimiento | null>(null);

  const columns = createColumns((r) => setRequerimientoAEditar(r));

  return (
    <>
      <DataTable
        columns={columns}
        data={requerimientos}
        globalFilter={globalFilter}
        getSearchText={camposBusqueda}
        />
      <ModalEditarRequerimiento
        requerimiento={requerimientoAEditar}
        onOpenChange={(open) => {
          if (!open) setRequerimientoAEditar(null);
        }}
      />
    </>
  );
};

export default TablaRequerimientos;