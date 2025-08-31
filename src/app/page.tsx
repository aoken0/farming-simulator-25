"use client";

import ContentP from "@/components/ContentP";
import ContentParagraph from "@/components/ContentParagraph";
import GlobalWrapper from "@/components/GlobalWrapper";
import { PATH } from "@/constants/path";
import Link from "next/link";
import { COLOR } from "@/utils/color";

const Home = () => {
  return (
    <GlobalWrapper>
      <ContentParagraph>
        <ContentP>
          当サイトをご利用いただきありがとうございます。<br />
          当サイトでは、現在2つの機能をご利用いただけます。
        </ContentP>
      </ContentParagraph>
      <ContentParagraph>
        <ContentP>作物や畜産物などから作れる製品を探したい方は<Link href={PATH["product-search"]} style={linkStyle}>こちら</Link>。</ContentP>
        <ContentP>作りたい製品の材料や工程を調べたい方は<Link  href={PATH["recipe"]} style={linkStyle}>こちら</Link>。</ContentP>
      </ContentParagraph>
    </GlobalWrapper>
  );
}

export default Home

const linkStyle = {
  color: COLOR.link,
  borderBottom: `1px solid ${COLOR.link}`,
}

