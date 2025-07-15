import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farming Simulator 25 wiki",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
