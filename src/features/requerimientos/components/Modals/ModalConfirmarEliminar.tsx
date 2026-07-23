import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Requerimiento } from "../../types/requerimiento.type";

type Props = {
  requerimiento: Requerimiento | null;
  onConfirmar: (id: string) => void;
  onOpenChange: (open: boolean) => void;
};

const ModalConfirmarEliminar = ({ requerimiento, onConfirmar, onOpenChange }: Props) => {
  return (
    <AlertDialog open={requerimiento !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar requerimiento?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el requerimiento de{" "}
            <span className="font-medium text-foreground">
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => requerimiento && onConfirmar(requerimiento.id)}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalConfirmarEliminar;