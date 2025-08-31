import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "Farming Simulator 25 Lab",
  description: "Farming Simulator 25 をプレイする上で重要な材料・工程の検索、どんな作物からどんな製品が作れるか等の機能を提供しています。また利益の計算も行えるため、効率的な生産計画を立てることができます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <QueryProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
