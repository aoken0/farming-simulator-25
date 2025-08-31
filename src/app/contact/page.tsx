"use client";

import styled from "styled-components";
import { useState, useRef } from "react";
import ContentP from "@/components/ContentP";
import ContentParagraph from "@/components/ContentParagraph";
import ContentTitle from "@/components/ContentTitle";
import GlobalWrapper from "@/components/GlobalWrapper";
import Small from "@/components/Small";

const Contact = () => {
  const emailRef = useRef<HTMLParagraphElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("/img/copy.png");

  const handleCopy = async () => {
    if (!emailRef.current) return;
    if (!emailRef.current.textContent) return;
    const email: string = emailRef.current.textContent;
    try {
      await navigator.clipboard.writeText(email);
      setImgUrl("/img/check_mark.svg");
    } catch {
      return;
    }
  }

  return (
    <GlobalWrapper $currentPage="お問い合わせ">
      <ContentTitle>メール</ContentTitle>
      <ContentParagraph>
        <ContentP>
          このサイトについてのお問い合わせやその他何かありましたら、下記のメールアドレスにご連絡お願いいたします。
        </ContentP>
        <Small>※クリックでコピーできます。</Small>
        <EmailWrapper>
          <p ref={emailRef} onClick={handleCopy}>aoken.contact@gmail.com</p>
          <CopyImg onClick={handleCopy} src={imgUrl} alt="copy" />
        </EmailWrapper>
      </ContentParagraph>
    </GlobalWrapper>
  )
}

export default Contact

const EmailWrapper = styled.div`
  width: 100%;
  background-color: #eee;
  padding: 1em;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  p {
    width: fit-content;
    overflow-wrap: break-word;
    cursor: pointer;
  }
`
const CopyImg = styled.img`
  width: 24px;
  height: auto;
  cursor: pointer;
`