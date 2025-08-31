import styled from "styled-components"
import Link from "next/link"
import { bizUDPGothic } from "@/utils/font"
import HamburgerButton from "./HamburgerButton"
import { useState, useEffect } from "react"
import { useWindowSize } from "@/utils/hooks/useWindowSize"
import { BREAKPOINT } from "@/constants/breakpoint"
import { COLOR } from "@/utils/color"
import { PATH } from "@/constants/path"

type Props = {
  children: React.ReactNode,
  $currentPage?: string,
}

const GlobalWrapper: React.FC<Props> = ({children, $currentPage}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width > BREAKPOINT.S) {
      setIsOpen(false)
    }
  }, [windowSize])

  return (
    <Wrapper className={bizUDPGothic.className}>
      <Header>
        <Link href="/"><LogoImg src="/img/cow.svg" alt="" /></Link>
        <h1><Link href="/">Farming Simulator 25 Lab</Link></h1>
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} $style={hamburgerBtnStyle} />
      </Header>
      <ContentWrapper>
        <SideCotent>
          <h4>Menu</h4>
          <h5>ツール</h5>
          <p><Link href={PATH["product-search"]}>生産品検索</Link></p>
          <p><Link href={PATH["recipe"]}>材料・工程検索</Link></p>
          <h5>データ</h5>
          <p><Link href={PATH["selling-price"]}>売値</Link></p>
          <h5>その他</h5>
          <p><Link href={PATH["selling-price"]}>売値</Link></p>
        </SideCotent>
        {isOpen ?
        <NavWrapper>
          <ul>
            <h4>Menu</h4>
            <h5>ツール</h5>
            <li><Link href={PATH["product-search"]}>生産品検索</Link></li>
            <li><Link href={PATH["recipe"]}>材料・工程検索</Link></li>
            <h5>データ</h5>
            <li><Link href={PATH["selling-price"]}>売値</Link></li>
            <h5>その他</h5>
          </ul>
        </NavWrapper>
        :
        <MainContent>
          <h1>{$currentPage || "トップページ"}</h1>
          {children}
        </MainContent>
        }
      </ContentWrapper>
    </Wrapper>
  )
}

export default GlobalWrapper

const hamburgerBtnStyle: React.CSSProperties = {
  position: "absolute",
  content: "",
  top: "50%",
  right: "16px",
  transform: "translateY(-30%)",
}

const Wrapper = styled.div`
  width: 72%;
  min-width: 720px;
  min-height: calc(100vh - 8px);
  padding-bottom: 1em;
  border-radius: .2em;
  margin: 4px auto;
  border: 1px solid #ccc;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 32px;
  font-size: 32px;
  @media screen and (max-width: ${BREAKPOINT.M}px) {
    width: 96%;
    font-size: 28px;
    min-width: auto;
  }
  @media screen and (max-width: ${BREAKPOINT.S}px) {
    font-size: 24px;
    width: 100%;
    margin: 0;
    border-radius: 0;
    border: 0;
  }
`
const Header = styled.header`
  width: 100%;
  background-image: linear-gradient(0deg, ${COLOR.main2} 2%, ${COLOR.main1});
  padding: 0 1em;
  border-radius: .2em .2em 0 0;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: .2em;
  @media screen and (max-width: ${BREAKPOINT.S}px) {
    padding: 0;
    border-radius: 0;
  }
  h1 {
    width: fit-content;
    color: white;
    font-size: max(.8em, 20px);
    line-height: 3em;
    cursor: pointer;
    @media screen and (max-width: ${BREAKPOINT.S}px) {
      width: 100%;
      font-size: 16px;
      padding-left: 16px;
    }
  }
`
const LogoImg = styled.img`
  width: 1.6em;
  height: auto;
`
const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 .8em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: 0.5em;
  @media screen and (max-width: ${BREAKPOINT.S}px) {
    padding: 0 .2em;
  }
`
const SideCotent = styled.nav`
  width: 25%;
  min-width: 180px;
  background-color: #fcfcfc;
  @media screen and (max-width: ${BREAKPOINT.S}px) {
    display: none; 
  }
  h4 {
    padding: 0 0.2em;
    font-size: 0.5em;
    line-height: 2em;
    font-weight: bold;
    background-color: #f9f9f9;
    color: ${COLOR.main2};
    border-bottom: 2px solid ${COLOR.main2};
  }
  h5 {
    padding: 0 0.5em;
    font-size: max(0.5em, 16px);
    font-weight: bold;
    line-height: 2em;
    color: #151515;
    background-color: #e5e5e5;
    cursor: default;
  }
  p {
    font-size: max(0.4em, 14px);
    line-height: 2em;
    cursor: pointer;
    color: ${COLOR.link};
    potision: relative;
    &::before {
      content: "・";
      color: ${COLOR.text};
      position: absolute;
    }
    a {
      padding: 0 .8em;
      display: inline-block;
      width: 100%;
      transition: all .2s ease-in-out;
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
`
const NavWrapper = styled.nav`
  width: 100%;
  height: 100%;
  h4 {
    margin-top: 1em;
    font-weight: bold;
    line-height: 2em;
    padding-left: .5em;
    background-color: #f9f9f9;
    color: ${COLOR.main2};
    border-bottom: 2px solid ${COLOR.main2};
    cursor: default;
  }
  h5 {
    margin-top: 1em;
    padding-left: 1em;
    font-size: max(0.5em, 16px);
    font-weight: bold;
    line-height: 2em;
    color: #151515;
    background-color: #e5e5e5;
    cursor: default;
  }
  ul {
    padding: 0 16px;
    font-size: max(0.6em, 14px);
    li {
      padding-left: 1em;
      line-height: 2;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
    }
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
`
const MainContent = styled.div`
  width: 75%;
  padding: 0.4em;
  padding-top: 0;
  background-color: white;
  @media screen and (max-width: ${BREAKPOINT.S}px) {
    width: 100%;
  }
  h1 {
    font-size: max(.8em, 22px);
    line-height: 1.5em;
    padding-left: 0.2em;
    border-bottom: 2px solid ${COLOR.main2};
    margin-bottom: .5em;
  }
`