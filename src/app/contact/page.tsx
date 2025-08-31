import { Metadata } from "next";
import Contact from "./Contact";

export const metadata: Metadata = {
  title: "FS25 | お問い合わせ",
  description: "当サイト (Farming Simulator 25 Lab) やそれに関連するお問い合わせはこちらからお願いいたします。",
}

const Page = () => {
  return (
    <Contact />
  )
}

export default Page