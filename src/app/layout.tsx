import type { Metadata } from "next";
import "./reset.css";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

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
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
