import "~/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Provider from "./provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Invinio",
  description:
    "Invenio is a inventory management system, based off of the latin word invenio, meaning 'to find'.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>{children}</body>
      </html>
    </Provider>
  );
}
