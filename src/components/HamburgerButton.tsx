import styled from "styled-components"
import { SetStateAction } from "react"
import { motion } from "framer-motion"
import { BREAKPOINTS } from "@/constants/breakpoint"

const BREAKPOINT_S = BREAKPOINTS.S

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>,
  $style?: React.CSSProperties,
}

const HamburgerButton: React.FC<Props> = ({isOpen, setIsOpen, $style}) => {
  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <Button id="hamburger-menu" onClick={() => toggleMenu()} style={$style}>
      <motion.svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.path
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 3 6 H 21" },
            open: { d: "M 4 4 L 20 20" },
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M 3 12 H 21"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 3 18 H 21" },
            open: { d: "M 4 20 L 20 4" },
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
    </Button>
  )
}

export default HamburgerButton

const Button = styled.div`
  width: 32px;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 3px;
  margin-top: -6px;
  display: none;
  @media screen and (max-width: ${BREAKPOINT_S}px) {
    display: block;
  }
  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: #fff;
  }
`