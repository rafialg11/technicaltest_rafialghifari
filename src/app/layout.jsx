import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trello Clone",
  description: "Technical Test Maia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navigation />
          {children}
      </body>
    </html>
  );
}
