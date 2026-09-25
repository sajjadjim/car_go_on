import "./globals.css";
import Navbar from "./navbar/page";
import Footer from "./footer/page";
import AuthProvider from "./context/AuthContext";

export const metadata = {
  title: "CarGoON BD | Buy & Sell Cars and Bikes in Bangladesh",
  description: "Bangladesh's premier marketplace for buying and selling cars and bikes at current BD market prices. Verified listings, BRTA registration info, and direct seller contact.",
  icons: {
    icon: "/car.png",
    shortcut: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#020617",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
