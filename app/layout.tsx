import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Privacy Chat",
  description:
    "Private & fully privacy-safe chats, simple to use and with no sign up required!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <header className="text-center">
          <Header />
        </header>
        <main className="mb-auto">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
