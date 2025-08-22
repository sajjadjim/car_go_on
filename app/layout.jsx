import "./globals.css";
import Navbar from "./navbar/page";
import Footer from "./footer/page";
import AuthProvider from "./context/AuthContext";

export const metadata = {
  title: "Car GoON",
  description: "Car GoON app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <AuthProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
