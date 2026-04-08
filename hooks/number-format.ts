export function formatWithCommas(value: string) {
  if (value === "") return "";
  const parts = value.split(".");
  const whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimal = parts[1] !== undefined ? `.${parts[1]}` : "";

  return whole + decimal;
}

export function formatMoneyOnBlur(value: string) {
  if (value === "") return "";

  const clean = value.replace(/,/g, "");
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(clean));
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
