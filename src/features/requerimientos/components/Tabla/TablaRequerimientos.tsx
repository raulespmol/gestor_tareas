import { useRequerimientos } from "@/context/RequerimientosContext";
import { useState, useMemo, useCallback } from "react";

import { DataTable } from "./DataTable";
import { createColumns } from "./columns";
import { camposBusqueda } from "../../utils/camposBusqueda";
import ModalEditarRequerimiento from "../Modals/ModalEditarRequerimiento";
import ModalDetalleRequerimiento from "../Modals/ModalDetalleRequerimiento";
import ModalConfirmarEliminar from "../Modals/ModalConfirmarEliminar";
import ModalRegistrarPago from "../../../pagos/components/Modals/ModalRegistrarPago";

import type { Requerimiento } from "../../types/requerimiento.type";

type TablaRequerimientosProps = {
  globalFilter: string;
  filtroEstados: string[];
};

const TablaRequerimientos = ({ globalFilter, filtroEstados }: TablaRequerimientosProps) => {
  const { requerimientos, eliminarRequerimiento, actualizarEstado, actualizarResponsable } = useRequerimientos();

  const [requerimientoAEditar, setRequerimientoAEditar] = useState<Requerimiento | null>(null);
  const [requerimientoDetalle, setRequerimientoDetalle] = useState<Requerimiento | null>(null);
  const [requerimientoAEliminar, setRequerimientoAEliminar] = useState<Requerimiento | null>(null);
  const [pagoARegistrar, setPagoARegistrar] = useState<Requerimiento | null>(null);

  const handleEditar = useCallback((r: Requerimiento) => setRequerimientoAEditar(r), []);
  const handleVerDetalle = useCallback((r: Requerimiento) => setRequerimientoDetalle(r), []);
  const handleEliminar = useCallback((r: Requerimiento) => setRequerimientoAEliminar(r), []);
  const handleRegistrarPago = useCallback((r: Requerimiento) => setPagoARegistrar(r), []);
  const handleActualizarEstado = useCallback(
    (id: string, estadoId: string) => actualizarEstado(id, estadoId), []
  );
  const handleActualizarResponsable = useCallback(
    (id: string, responsableId: string) => actualizarResponsable(id, responsableId), []
  );  

 const columns = useMemo(
  () => createColumns(
    handleEditar,
    handleVerDetalle,
    handleEliminar,
    handleRegistrarPago,
    handleActualizarEstado,
    handleActualizarResponsable,
  ),
  [handleEditar, handleVerDetalle, handleEliminar, handleRegistrarPago, handleActualizarEstado, handleActualizarResponsable]
);

  const requerimientosFiltrados = useMemo(
    () => filtroEstados.length === 0
      ? requerimientos
      : requerimientos.filter((r) => filtroEstados.includes(r.estadoId)),
    [requerimientos, filtroEstados]
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={requerimientosFiltrados}
        globalFilter={globalFilter}
        getSearchText={camposBusqueda}
      />
      <ModalEditarRequerimiento
        requerimiento={requerimientoAEditar}
        onOpenChange={(open) => { if (!open) setRequerimientoAEditar(null); }}
      />
      <ModalDetalleRequerimiento
        requerimiento={requerimientoDetalle}
        onOpenChange={(open) => { if (!open) setRequerimientoDetalle(null); }}
      />
      <ModalConfirmarEliminar
        requerimiento={requerimientoAEliminar}
        onConfirmar={(id) => {
          eliminarRequerimiento(id);
          setRequerimientoAEliminar(null);
        }}
        onOpenChange={(open) => { if (!open) setRequerimientoAEliminar(null); }}
      />
      <ModalRegistrarPago
        requerimiento={pagoARegistrar}
        onOpenChange={(open) => { if (!open) setPagoARegistrar(null); }}
      />
    </>
  );
};

export default TablaRequerimientos;