// app/page.jsx
import { redirect } from "next/navigation";

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

export default function Page() {
  redirect("/home");
}
