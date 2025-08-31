import { Metadata } from "next";
import ProductSearch from "./ProductSearch";

export const metadata: Metadata = {
  title: "FS25 | 生産品検索",
  description: "作物等の材料を指定することで、作れる製品を検索できます。",
}

const Page = () => {
  return (
    <ProductSearch />
  )
}

export default Page