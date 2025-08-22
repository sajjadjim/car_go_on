import "./globals.css";
import Navbar from "./navbar/page";
import Footer from "./footer/page";
import AuthProvider from "./context/AuthContext";

// export const metadata = {
//   title: "Car GoON",
//   description: "Car GoON app",
// };

// app/layout.jsx
export const metadata = {
  title: "Car GoON",
  description: "Car GoON app",
  icons: {
    icon: "/public/car.png",           // if you put it in /public or /app
    apple: "/apple-icon.png",       // 180x180
    shortcut: "/favicon.ico",
  },
  themeColor: "#0f172a",            // nice dark tab color on mobile
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
