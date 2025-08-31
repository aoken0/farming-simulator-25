import { Metadata } from "next";
import RecipeViewer from "./Recipe";

export const metadata: Metadata = {
  title: "FS25 | 材料・工程検索",
  description: "作りたい製品を指定することで、必要な工場や材料等を計算できます。",
}

const Page = () => {
  return (
    <RecipeViewer />
  )
}

export default Page