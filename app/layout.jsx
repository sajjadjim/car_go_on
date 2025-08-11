// app/layout.jsx (Server Component - no "use client")
import Footer from "./footer/page";
import "./globals.css";
import Navbar from "./navbar/page";
import Home from "./page";
 // <-- your existing Home.jsx (component)

export const metadata = {
  title: "Car GoON",
  description: "Car GoON app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
          {/* Always show Home items on every route */}
          <Home />
        </main>
        <Footer />
      </body>
    </html>
  );
}
