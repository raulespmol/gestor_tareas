import type { Estado } from "@/features/requerimientos/types/estado.type";

export const estados: Estado[] = [
  { 
    id: "0",
    key:"proceso",
    label: "En proceso",
    color: "gray"
  },

  { 
    id: "1",
    key:"cotizar",
    label: "Cotizar",
    color: "red"
  },

  { 
    id: "2",
    key:"diseño",
    label: "Diseño",
    color: "sky"
  },

  { 
    id: "3",
    key:"impresion",
    label: "Impresión",
    color: "sky"
  },

  { 
    id: "4",
    key:"taller",
    label: "Taller",
    color: "sky"
  },  

  {
    id: "5",
    key:"entregar",
    label: "Por entregar",
    color: "orange"
  },

  { 
    id: "6",
    key:"instalacion",
    label: "Instalación",
    color: "purple"
  },

  { 
    id: "7",
    key:"externo",
    label: "Externo",
    color: "purple"
  },

  { 
    id: "8",
    key:"entregado",
    label: "Entregado",
    color: "green"
  },

];
