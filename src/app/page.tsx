"use client";

import ContentP from "@/components/ContentP";
import ContentParagraph from "@/components/ContentParagraph";
import GlobalWrapper from "@/components/GlobalWrapper";

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
        <ContentP>作物や畜産物などから作れる製品を探したい方はこちら。</ContentP>
        <ContentP>作りたい製品の材料や工程を調べたい方はこちら。</ContentP>
      </ContentParagraph>
    </GlobalWrapper>
  );
}

export default Home

