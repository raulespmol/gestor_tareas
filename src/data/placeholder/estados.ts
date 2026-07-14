import type { Estado } from "@/features/requerimientos/types/estado.type";

export const estados: Estado[] = [
  { 
    id: "0",
    key:"proceso",
    label: "En proceso",
    color: "bg-gray-50 text-gray-700 border-gray-700 dark:bg-gray-950 dark:text-gray-300"
  },

  { 
    id: "1",
    key:"cotizar",
    label: "Cotizar",
    color: "bg-red-50 text-red-700 border-red-700 dark:bg-red-950 dark:text-red-300"
  },

  { 
    id: "2",
    key:"diseño",
    label: "Diseño",
    color: "bg-sky-50 text-sky-700 border-sky-700 dark:bg-sky-950 dark:text-sky-300"
  },

  { 
    id: "3",
    key:"impresion",
    label: "Impresión",
    color: "bg-sky-50 text-sky-700 border-sky-700 dark:bg-sky-950 dark:text-sky-300"
  },

  { 
    id: "4",
    key:"taller",
    label: "Taller",
    color: "bg-sky-50 text-sky-700 border-sky-700 dark:bg-sky-950 dark:text-sky-300"
  },  

  {
    id: "5",
    key:"entregar",
    label: "Por entregar",
    color: "bg-orange-50 text-orange-700 border-orange-700 dark:bg-orange-950 dark:text-orange-300"
  },

  { 
    id: "6",
    key:"instalacion",
    label: "Instalación",
    color: "bg-purple-50 text-purple-700 border-purple-700 dark:bg-purple-950 dark:text-purple-300"
  },

  { 
    id: "7",
    key:"externo",
    label: "Externo",
    color: "bg-purple-50 text-purple-700 border-purple-700 dark:bg-purple-950 dark:text-purple-300"
  },

  { 
    id: "8",
    key:"entregado",
    label: "Entregado",
    color: "bg-green-50 text-green-700 border-green-700 dark:bg-green-950 dark:text-green-300"
  },

];
