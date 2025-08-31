import { Metadata } from "next";
import SellingPrice from "./SellingPrices";

export const metadata: Metadata = {
  title: "FS25 | 売値一覧",
  description: "Farming Simulator 25 内のすべての作物や製品の売値情報が確認できます。",
}

const Page = () => {
  return (
    <SellingPrice />
  )
}

export default Page