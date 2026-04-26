export function formatDateCA(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(parsed);
}

export function formatCadFromNumber(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function maskIdentifier(value: string) {
  if (value.length <= 4) return value;
  return `${"*".repeat(Math.max(2, value.length - 4))}${value.slice(-4)}`;
}
