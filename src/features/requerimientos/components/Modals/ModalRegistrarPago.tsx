import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRequerimientos } from "@/context/RequerimientosContext";
import type { Requerimiento } from "@/features/requerimientos/types/requerimiento.type";

type Props = {
  requerimiento: Requerimiento | null;
  onOpenChange: (open: boolean) => void;
};

const mediosPago = [
  { value: "efectivo", label: "Efectivo" },
  { value: "transferencia", label: "Transferencia" },
  { value: "debito", label: "Débito" },
  { value: "credito", label: "Crédito" },
];

const ModalRegistrarPago = ({ requerimiento, onOpenChange }: Props) => {
  const { registrarPago } = useRequerimientos();
  const [montoPago, setMontoPago] = useState("");
  const [medioPago, setMedioPago] = useState("");
  const [voucher, setVoucher] = useState("");
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setMontoPago("");
    setMedioPago("");
    setVoucher("");
    setError(null);
  };

  useEffect(() => {
    if (!requerimiento) {
      resetForm();
      return;
    }

    resetForm();
  }, [requerimiento]);

  const handleSubmit = () => {
    if (!requerimiento) return;

    const montoNumerico = Number(montoPago);
    const pendienteActual = Math.max(0, requerimiento.montoPendiente);

    if (!montoPago || Number.isNaN(montoNumerico) || montoNumerico <= 0) {
      setError("Ingrese un monto válido para el pago.");
      return;
    }

    if (montoNumerico > pendienteActual) {
      setError(`El monto no puede superar el pendiente de $${pendienteActual.toLocaleString()}.`);
      return;
    }

    if (!medioPago) {
      setError("Seleccione un medio de pago.");
      return;
    }

    if ((medioPago === "debito" || medioPago === "credito") && !voucher.trim()) {
      setError("Ingrese el número de voucher.");
      return;
    }

    registrarPago(requerimiento.id, montoNumerico, medioPago, voucher.trim());
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog 
      open={requerimiento !== null}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar pago</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="grid gap-1">
            <span className="text-sm text-muted-foreground">Monto total</span>
            <div className="rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm font-medium">
              {requerimiento ? `$${requerimiento.montoTotal.toLocaleString()}` : "-"}
            </div>
          </div>
          <div className="grid gap-1">
            <span className="text-sm text-muted-foreground">Monto pendiente</span>
            <div className="rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm font-medium">
              {requerimiento ? `$${requerimiento.montoPendiente.toLocaleString()}` : "-"}
            </div>
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="monto-pago">
              Monto a pagar
            </label>
            <Input
              id="monto-pago"
              type="number"
              value={montoPago}
              onChange={(event) => setMontoPago(event.target.value)}
              placeholder="Ingrese monto"
              className="text-sm"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="medio-pago">
              Medio de pago
            </label>
            <Select value={medioPago} onValueChange={setMedioPago}>
              <SelectTrigger id="medio-pago" className="w-full text-sm">
                <SelectValue placeholder="Seleccione medio" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {mediosPago.map((medio) => (
                    <SelectItem key={medio.value} value={medio.value}>
                      {medio.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {(medioPago === "debito" || medioPago === "credito") && (
            <div className="grid gap-1">
              <label className="text-sm font-medium" htmlFor="voucher">
                Número de voucher
              </label>
              <Input
                id="voucher"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                placeholder="Ingrese número de voucher"
                className="text-sm"
              />
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Registrar Pago</Button>
        </DialogFooter>
      </DialogContent>
      <DialogDescription className="sr-only">
        Registra un pago para el requerimiento seleccionado.
      </DialogDescription>
    </Dialog>
  );
};

export default ModalRegistrarPago;
