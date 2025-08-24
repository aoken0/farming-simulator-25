import { Noto_Sans_JP } from "next/font/google";
import { BIZ_UDPGothic } from "next/font/google";

export const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const bizUDPGothic = BIZ_UDPGothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
})