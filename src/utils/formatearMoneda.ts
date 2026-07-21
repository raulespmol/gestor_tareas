export const formatearMoneda = (value: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);

export const formatearMonedaInput = (value: number | string | undefined) => {
  if (value === undefined || value === null || value === "") return "";

  const numericValue =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/\D/g, ""));

  if (!Number.isFinite(numericValue)) return "";

  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(numericValue);
};

export const parsearMonedaInput = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
};