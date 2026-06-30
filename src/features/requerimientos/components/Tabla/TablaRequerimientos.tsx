import { useRequerimientos } from "@/context/RequerimientosContext";

import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { camposBusqueda } from "../../utils/camposBusqueda";

type TablaRequerimientosProps = {
  globalFilter: string
}

const TablaRequerimientos = ({ globalFilter }: TablaRequerimientosProps) => {  
  const { requerimientos } = useRequerimientos();

  return (
      <DataTable
        columns={columns}
        data={requerimientos}
        globalFilter={globalFilter}
        getSearchText={camposBusqueda}
      />
  );
};

export default TablaRequerimientos;