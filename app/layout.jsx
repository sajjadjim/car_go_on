import "./globals.css";
import Navbar from "./navbar/page";
import Footer from "./footer/page";
import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";

export const metadata = {
  title: "CarGoON BD | Buy & Sell Cars and Bikes in Bangladesh",
  description: "Bangladesh's premier marketplace for buying and selling cars and bikes at current BD market prices. Verified listings, BRTA registration info, and direct seller contact.",
  icons: {
    icon: "/car.png",
    shortcut: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('cargoon_theme');
    var isDark = stored === 'dark' || (!stored || stored === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  } catch(e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
