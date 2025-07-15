import { RawSellingPrice, SellingPrice } from "./type"

export const formatSellingPriceData = (sellingPrice: RawSellingPrice[]): SellingPrice[] => {
  const formattedSellingPrice = sellingPrice
    .filter(item => item.type !== "extra")
    .map((item) => ({
      ...item,
      maxMonthLabel: formatMonths(item.maxMonths),
    }))
  return formattedSellingPrice
}

export const formatMonths = (months: number[]) => {
  if (months.length == 1) return `${months}月`;
  const sorted = [...months].sort((a, b) => a - b);
  const label = [];
  let start = sorted[0];
  for (let i = 1; i < months.length; i++) {
    if (sorted[i] - sorted[i-1] > 1) {
      label.push(`${start}~${sorted[i-1]}`);
      start = sorted[i]
    }
  }
  if (start === sorted.slice(-1)[0]) {
    label.push(`${start}月`)
  } else {
    label.push(`${start}~${sorted.slice(-1)[0]}月`)
  }
  return label.join(",");
}