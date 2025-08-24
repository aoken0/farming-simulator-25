import styled from "styled-components"
import Link from "next/link"
import { notoSansJP } from "@/utils/font"
import HamburgerButton from "./HamburgerButton"
import { useState, useEffect } from "react"
import { useWindowSize } from "@/utils/hooks/useWindowSize"
import { BREAKPOINTS } from "@/constants/breakpoint"

type Props = {
  children: React.ReactNode
}

const BREAKPOINT_S = BREAKPOINTS.S;

const GlobalWrapper: React.FC<Props> = ({children}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width > BREAKPOINT_S) {
      setIsOpen(false)
    }
  }, [windowSize])

  return (
    <Wrapper className={notoSansJP.className}>
      <Header>
        <h1><Link href="/">Farming Simulator 25 Lab</Link></h1>
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} $style={hamburgerBtnStyle} />
      </Header>
      <ContentWrapper>
        <SideCotent>
          {/* <h4>シミュレーター</h4>
          <p><Link href="/production-planner">生産計画ツール</Link></p> */}
          <h4>生産</h4>
          <p><Link href="/recipe-viewer">材料・工程</Link></p>
          <h4>作物・生産物</h4>
          <p><Link href="/selling-price">売値</Link></p>
        </SideCotent>
        {isOpen ?
        <NavWrapper>
          <ul>
            <h4>生産</h4>
            <li><Link href="/recipe-viewer">材料検索</Link></li>
            <h4>作物・生産物</h4>
            <li><Link href="/selling-price">売値</Link></li>
            <li><Link href="/selling-price">売値</Link></li>
          </ul>
        </NavWrapper>
        :
        <MainContent>
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
  padding-bottom: 1em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 32px;
  font-size: 32px;
  @media screen and (max-width: 768px) {
    width: 96%;
    font-size: 28px;
  }
  @media screen and (max-width: ${BREAKPOINT_S}px) {
    font-size: 24px;
    width: 100%;
  }
`
const Header = styled.header`
  width: 100%;
  background-color: #444;
  padding: 0 1em;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
  @media screen and (max-width: ${BREAKPOINT_S}px) {
    padding: 0;
  }
  h1 {
    width: fit-content;
    color: white;
    font-size: 1em;
    line-height: 3em;
    cursor: pointer;
    @media screen and (max-width: ${BREAKPOINT_S}px) {
      width: 100%;
      font-size: 20px;
      padding-left: 16px;
    }
  }
`
const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: 0.5em;
`
const SideCotent = styled.nav`
  width: 25%;
  min-width: 180px;
  background-color: white;
  box-shadow: 0 0 4px 1px #ddd;
  @media screen and (max-width: ${BREAKPOINT_S}px) {
    display: none; 
  }
  h4 {
    padding: 0 0.5em;
    font-size: 0.6em;
    font-weight: bold;
    line-height: 2em;
    color: white;
    background-color:rgb(0, 109, 24);
    cursor: default;
  }
  p {
    font-size: 0.5em;
    line-height: 2em;
    cursor: pointer;
    a {
      padding: 0 0.5em;
      display: inline-block;
      width: 100%;
      &:hover {
        background-color: #ccc;
      }
    }
  }
`
const MainContent = styled.div`
  width: 75%;
  padding: 0.4em;
  background-color: white;
  box-shadow: 0 0 4px 1px #ddd;
  @media screen and (max-width: ${BREAKPOINT_S}px) {
    width: 100%;
    margin: 0 16px;
  }
`
const NavWrapper = styled.nav`
  width: 100%;
  height: 100%;
  h4 {
    margin-top: 1em;
    background-color:rgb(0, 109, 24);
    font-weight: bold;
    line-height: 2em;
    color: white;
    padding-left: 1em;
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