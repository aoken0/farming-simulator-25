import { SellingPrice } from "@/utils/type"; 

export const sortBy = (data: SellingPrice[], type: string, reverse?: boolean) : SellingPrice[] => {
  let sortedData = data;
  switch (type) {
    case "highest":
      sortedData = [...data].sort((a, b) => (b.maxPrice - a.maxPrice));
      break;
    case "lowest":
      sortedData = [...data].sort((a, b) => (b.minPrice - a.minPrice));
      break;
    case "aiueo":
      sortedData = [...data].sort((a, b) => a.reading.localeCompare(b.reading, 'ja'));
      break;
    case "month":
      sortedData = [...data].sort((a, b) => a.maxMonthLabel.localeCompare(b.maxMonthLabel, "ja"));
      break;
    default:
      break;
  }
  if (reverse) {
    sortedData.reverse();
  }
  return sortedData
}