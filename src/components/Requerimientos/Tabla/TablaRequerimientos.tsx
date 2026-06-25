import { useRequerimientos } from "@/context/RequerimientosContext";

import { DataTable } from "./DataTable";
import { columns } from "./columns";

const TablaRequerimientos = () => {
  const { requerimientos } = useRequerimientos();

  return (
    <DataTable
      columns={columns}
      data={requerimientos}
    />
  );
};

export default TablaRequerimientos;