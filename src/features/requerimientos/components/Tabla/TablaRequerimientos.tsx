import { useRequerimientos } from "@/context/RequerimientosContext";

import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { useState } from "react";
import BuscadorRequerimientos from "../Toolbar/BuscadorRequerimientos";

const TablaRequerimientos = () => {  
  const [globalFilter, setGlobalFilter] = useState("")
  const { requerimientos } = useRequerimientos();

  return (
    <>
      <BuscadorRequerimientos
        value={globalFilter}
        onChange={setGlobalFilter}
      />
      <DataTable
        columns={columns}
        data={requerimientos}
        globalFilter={globalFilter}
      />
    </>
  );
};

export default TablaRequerimientos;