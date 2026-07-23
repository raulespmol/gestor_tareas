import type { Estado } from "@/catalogos/estados/estado.type";

export const estados: Estado[] = [
  { 
    id: "0",
    key:"en_proceso",
    label: "En proceso",
  },

  { 
    id: "1",
    key:"cotizar",
    label: "Cotizar",
  },

  { 
    id: "2",
    key:"diseno",
    label: "Diseño",
  },

  { 
    id: "3",
    key:"impresion",
    label: "Impresión",
  },

  { 
    id: "4",
    key:"taller",
    label: "Taller",
  },  

  {
    id: "5",
    key:"por_entregar",
    label: "Por entregar",
  },

  { 
    id: "6",
    key:"instalacion",
    label: "Instalación",
  },

  { 
    id: "7",
    key:"externo",
    label: "Externo",
  },

  { 
    id: "8",
    key:"entregado",
    label: "Entregado",
  },

];
