'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/page";
import Footer from "./footer/page";
import { useEffect } from "react";
import Home from "./home/page";

export default function RootLayout({ children }) {
  useEffect(()=>{
    document.title = "Car GoON";
  })
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
          <Home></Home>
        </main>
        <Footer />
      </body>
    </html>
  );
}
