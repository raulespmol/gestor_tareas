export const coloresEstado = {
  gray: {
    badge:
      "bg-gray-50 text-gray-700 border-gray-700 dark:bg-gray-950 dark:text-gray-300",
    dot:
      "size-2 rounded-full bg-gray-500",
  },

  red: {
    badge:
      "bg-red-50 text-red-700 border-red-700 dark:bg-red-950 dark:text-red-300",
    dot:
      "size-2 rounded-full bg-red-500",
  },

  sky: {
    badge:
      "bg-sky-50 text-sky-700 border-sky-700 dark:bg-sky-950 dark:text-sky-300",
    dot:
      "size-2 rounded-full bg-sky-500",
  },

  orange: {
    badge:
      "bg-orange-50 text-orange-700 border-orange-700 dark:bg-orange-950 dark:text-orange-300",
    dot:
      "size-2 rounded-full bg-orange-500",
  },

  purple: {
    badge:
      "bg-purple-50 text-purple-700 border-purple-700 dark:bg-purple-950 dark:text-purple-300",
    dot:
      "size-2 rounded-full bg-purple-500",
  },

  green: {
    badge:
      "bg-green-50 text-green-700 border-green-700 dark:bg-green-950 dark:text-green-300",
    dot:
      "size-2 rounded-full bg-green-500",
  },
} as const;

export type EstadoColor  = keyof typeof coloresEstado;